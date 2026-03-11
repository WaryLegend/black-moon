import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import ms, { StringValue } from 'ms';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { MailService } from '@/mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ActivateCodeDto } from './dto/activate-code.dto';
import { RecoverPasswordCodeDto } from './dto/recover-password-code.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordCodeDto } from './dto/reset-password-code.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  generateActivationCode,
  generateActivationKey,
  generateResetCode,
} from '@/common/utils/random.util';
import {
  ACTIVATION_CODE_REQUEST_COOLDOWN_MS,
  ACTIVATION_CODE_TTL_MS,
  RESET_CODE_TTL_MS,
  RESET_REQUEST_COOLDOWN_MS,
} from './constants/auth.constants';
import {
  GoogleAuthService,
  GoogleUserInfo,
} from './services/google-auth.service';
import { AuthPortal } from './constants/auth-portal.enum';

const DEFAULT_USER_ROLE = 'USER';

type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true; role: true };
}>;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  // =====REGISTER======
  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const role = await this.getDefaultUserRole();
    const activationCode = generateActivationCode();
    const activationKey = generateActivationKey();
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        activated: false,
        activationCode,
        activationCodeDate: new Date(),
        activationKey,
        role: role
          ? {
              connect: { id: role.id },
            }
          : undefined,
        profile: {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            fullName: `${dto.lastName} ${dto.firstName}`.trim(),
            phoneNumber: dto.phoneNumber,
            birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
            gender: dto.gender,
          },
        },
        point: {
          create: {},
        },
      },
      include: { profile: true, role: true },
    });

    await this.mailService.sendActivationCodeEmail({
      to: user.email,
      name: user.profile?.fullName ?? user.profile?.firstName ?? user.email,
      code: activationCode,
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.profile?.firstName ?? null,
      lastName: user.profile?.lastName ?? null,
    };
  }
  // =====LOGIN======
  async login(dto: LoginDto, portal: AuthPortal): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true, role: true },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const matches = await bcrypt.compare(dto.password, user.password);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roleName = this.normalizeRoleName(user.role?.name, user.id);
    this.ensurePortalAccess(roleName, portal);

    await this.updateLastLogin(user.id);
    const tokens = await this.issueTokens(user);
    return this.buildAuthResponse(tokens.accessToken, tokens.refreshToken);
  }
  // =====GOOGLE LOGIN======
  async googleLogin(code: string): Promise<AuthResponseDto> {
    const tokenResponse =
      await this.googleAuthService.exchangeCodeForTokens(code);
    const userInfo = await this.googleAuthService.getUserInfo(
      tokenResponse.access_token,
    );
    const user = await this.findOrCreateGoogleUser(userInfo);
    await this.updateLastLogin(user.id);
    const tokens = await this.issueTokens(user);
    return this.buildAuthResponse(tokens.accessToken, tokens.refreshToken);
  }
  // =====REFRESH TOKEN======
  async refresh(refreshToken: string | null): Promise<AuthResponseDto> {
    if (!refreshToken) {
      throw new BadRequestException('Missing refresh token');
    }
    const stored = await this.prisma.userRefreshToken.findFirst({
      where: { refreshToken },
      include: { user: { include: { profile: true, role: true } } },
    });
    if (!stored || !stored.user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (stored.expiryDate && stored.expiryDate.getTime() < Date.now()) {
      await this.prisma.userRefreshToken.delete({ where: { id: stored.id } });
      throw new UnauthorizedException('Refresh token expired');
    }

    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
    if (!refreshSecret) {
      throw new InternalServerErrorException('Missing refresh token secret');
    }

    try {
      this.jwtService.verify(refreshToken, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.prisma.userRefreshToken.delete({ where: { id: stored.id } });
    const tokens = await this.issueTokens(stored.user);
    if (!tokens.refreshToken) {
      throw new UnauthorizedException('Account is not activated');
    }
    return this.buildAuthResponse(tokens.accessToken, tokens.refreshToken);
  }
  // =====LOG OUT======
  async logout(refreshToken: string | null): Promise<{ success: boolean }> {
    if (refreshToken) {
      await this.prisma.userRefreshToken.deleteMany({
        where: { refreshToken },
      });
    }
    return { success: true };
  }
  // =====SEND ACTIVATION CODE======
  async sendActivationCode(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email, activated: false },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found or already activated');
    }

    if (
      user.activationCodeDate &&
      Date.now() - user.activationCodeDate.getTime() <
        ACTIVATION_CODE_REQUEST_COOLDOWN_MS
    ) {
      throw new BadRequestException('Activation code requested too frequently');
    }

    const activationCode = generateActivationCode();
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        activationCode,
        activationCodeDate: new Date(),
      },
      include: { profile: true },
    });

    await this.mailService.sendActivationCodeEmail({
      to: updated.email,
      name:
        updated.profile?.fullName ??
        updated.profile?.firstName ??
        updated.email,
      code: activationCode,
    });
  }
  // =====1. ACTIVATION + CODE======
  async activateAccountWithCode(
    dto: ActivateCodeDto,
  ): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true, role: true },
    });
    if (!user || !user.activationCode) {
      throw new UnauthorizedException('Invalid activation code');
    }
    if (user.activationCode !== dto.activationCode) {
      throw new UnauthorizedException('Invalid activation code');
    }
    if (
      user.activationCodeDate &&
      user.activationCodeDate.getTime() + ACTIVATION_CODE_TTL_MS < Date.now()
    ) {
      throw new UnauthorizedException('Activation code expired');
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        activated: true,
        activationKey: null,
        activationCode: null,
        activationCodeDate: null,
      },
      include: { profile: true, role: true },
    });

    const tokens = await this.issueTokens(updated);
    return this.buildAuthResponse(tokens.accessToken, tokens.refreshToken);
  }
  // =====2. ACTIVATION + KEY======
  async activateAccountWithKey(key: string): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findFirst({
      where: { activationKey: key },
      include: { profile: true, role: true },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid activation key');
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        activated: true,
        activationKey: null,
        activationCode: null,
        activationCodeDate: null,
      },
      include: { profile: true, role: true },
    });

    const tokens = await this.issueTokens(updated);
    return this.buildAuthResponse(tokens.accessToken, tokens.refreshToken);
  }
  // =====MAIL ACTIVATION + CODE======
  async sendActivationEmail(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email, activated: false },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found or already activated');
    }

    const activationKey = user.activationKey ?? generateActivationKey();
    if (!user.activationKey) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { activationKey },
      });
    }

    await this.mailService.sendActivationEmail({
      to: user.email,
      name: user.profile?.fullName ?? user.profile?.firstName ?? user.email,
      activationKey,
    });
  }
  // =====RECOVER PASSWORD + CODE======
  async recoverPasswordCode(dto: RecoverPasswordCodeDto): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email, activated: true },
      include: { profile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      user.codeResetDate &&
      Date.now() - user.codeResetDate.getTime() < RESET_REQUEST_COOLDOWN_MS
    ) {
      throw new BadRequestException('You need to wait before requesting again');
    }

    const resetCode = generateResetCode();
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode,
        codeResetDate: new Date(),
      },
      include: { profile: true },
    });

    await this.mailService.sendResetCodeEmail({
      to: updated.email,
      name:
        updated.profile?.fullName ??
        updated.profile?.firstName ??
        updated.email,
      code: resetCode,
    });
  }
  // =====VERIFY RESET_ACTION + CODE======
  async verifyResetCode(dto: VerifyResetCodeDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.resetCode) {
      throw new UnauthorizedException('Invalid reset code');
    }
    if (user.resetCode !== dto.resetCode) {
      throw new UnauthorizedException('Invalid reset code');
    }
    if (
      user.codeResetDate &&
      user.codeResetDate.getTime() + RESET_CODE_TTL_MS < Date.now()
    ) {
      throw new UnauthorizedException('Reset code expired');
    }
  }
  // =====RESET_PASSWORD + CODE======
  async resetPasswordWithCode(dto: ResetPasswordCodeDto): Promise<void> {
    await this.verifyResetCode({ email: dto.email, resetCode: dto.resetCode });
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetCode: null,
        codeResetDate: null,
      },
    });
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('New password must be different');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });
    if (!user || !user.password) {
      throw new BadRequestException('Password change is not available');
    }

    const matches = await bcrypt.compare(dto.currentPassword, user.password);
    if (!matches) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { success: true };
  }

  getGoogleAuthorizationUrl(): string {
    return this.googleAuthService.buildAuthorizationUrl();
  }

  private async getDefaultUserRole() {
    const preferred =
      this.config.get<string>('DEFAULT_ROLE_NAME') ?? DEFAULT_USER_ROLE;
    const candidates = Array.from(
      new Set([preferred, DEFAULT_USER_ROLE, 'ROLE_USER']),
    );
    for (const name of candidates) {
      if (!name) {
        continue;
      }
      const role = await this.prisma.role.findFirst({ where: { name } });
      if (role) {
        return role;
      }
    }
    return null;
  }

  private async findOrCreateGoogleUser(
    userInfo: GoogleUserInfo,
  ): Promise<UserWithProfile> {
    const existing = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
      include: { profile: true, role: true },
    });

    if (existing) {
      return this.prisma.user.update({
        where: { id: existing.id },
        data: {
          googleId: userInfo.sub,
          activated: true,
          profile: existing.profile
            ? {
                update: {
                  firstName: userInfo.given_name ?? existing.profile.firstName,
                  lastName: userInfo.family_name ?? existing.profile.lastName,
                  fullName: userInfo.name ?? existing.profile.fullName,
                  avatarUrl:
                    userInfo.picture ?? existing.profile.avatarUrl ?? null,
                  avatarName: existing.profile.avatarName ?? null,
                },
              }
            : {
                create: {
                  firstName: userInfo.given_name ?? userInfo.name,
                  lastName: userInfo.family_name ?? '',
                  fullName: userInfo.name,
                  avatarUrl: userInfo.picture,
                  avatarName: null,
                },
              },
        },
        include: { profile: true, role: true },
      });
    }

    const role = await this.getDefaultUserRole();
    return this.prisma.user.create({
      data: {
        email: userInfo.email,
        googleId: userInfo.sub,
        activated: true,
        role: role
          ? {
              connect: { id: role.id },
            }
          : undefined,
        profile: {
          create: {
            firstName: userInfo.given_name ?? userInfo.name,
            lastName: userInfo.family_name ?? '',
            fullName: userInfo.name,
            avatarUrl: userInfo.picture,
            avatarName: null,
          },
        },
        point: { create: {} },
      },
      include: { profile: true, role: true },
    });
  }

  // ===================================================================
  private async issueTokens(
    user: UserWithProfile,
  ): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    if (!user.activated) {
      return { accessToken: null, refreshToken: null };
    }

    await this.pruneExpiredRefreshTokens();
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.profile?.fullName ?? null,
      role: user.role?.name ?? null,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
    if (!refreshSecret) {
      throw new InternalServerErrorException('Missing refresh token secret');
    }

    const refreshExpiresIn = (this.config.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
      '30d',
    ) ?? '30d') as StringValue;
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: refreshExpiresIn,
    });

    const expiresMs =
      this.parseDurationMs(refreshExpiresIn) || 30 * 24 * 60 * 60 * 1000;
    await this.replaceUserRefreshToken(user.id, refreshToken, expiresMs);

    return { accessToken, refreshToken };
  }

  private buildAuthResponse(
    accessToken: string | null,
    refreshToken: string | null,
  ): AuthResponseDto {
    return {
      accessToken,
      refreshToken,
    };
  }

  private parseDurationMs(value: string): number {
    const parsed = ms(value as StringValue);
    return typeof parsed === 'number' ? parsed : 0;
  }

  private async pruneExpiredRefreshTokens(): Promise<void> {
    await this.prisma.userRefreshToken.deleteMany({
      where: { expiryDate: { lt: new Date() } },
    });
  }

  private async replaceUserRefreshToken(
    userId: number,
    refreshToken: string,
    expiresMs: number,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.userRefreshToken.deleteMany({ where: { userId } });
      await tx.userRefreshToken.create({
        data: {
          refreshToken,
          createdDate: new Date(),
          expiryDate: new Date(Date.now() + expiresMs),
          userId,
        },
      });
    });
  }

  private normalizeRoleName(
    roleName: string | null | undefined,
    userId: number,
  ): string {
    if (roleName) {
      return roleName;
    }
    this.logger.error(
      `User ${userId} has null role. Treating as ${DEFAULT_USER_ROLE}.`,
    );
    return DEFAULT_USER_ROLE;
  }

  private ensurePortalAccess(roleName: string, portal: AuthPortal): void {
    const isUserRole = roleName === DEFAULT_USER_ROLE;
    if (isUserRole && portal === AuthPortal.WORKSPACE) {
      throw new ForbiddenException('Access denied for workspace portal');
    }
    if (!isUserRole && portal === AuthPortal.USER) {
      throw new ForbiddenException('Access denied for user portal');
    }
  }

  private async updateLastLogin(userId: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLogin: new Date() },
    });
  }
}
