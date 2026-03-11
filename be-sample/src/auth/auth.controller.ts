import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ActivateCodeDto } from './dto/activate-code.dto';
import { RecoverPasswordCodeDto } from './dto/recover-password-code.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { ResetPasswordCodeDto } from './dto/reset-password-code.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_NAME,
} from './constants/auth.constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthPortal } from './constants/auth-portal.enum';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(dto, AuthPortal.USER);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @Post('workspace/login')
  async workspaceLogin(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(dto, AuthPortal.WORKSPACE);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @Post('google')
  async loginWithGoogle(
    @Body() dto: GoogleAuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.googleLogin(dto.code);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @Get('google')
  redirectToGoogle(@Res() res: Response): void {
    res.redirect(this.authService.getGoogleAuthorizationUrl());
  }

  @Get('google/callback')
  async handleGoogleCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.authService.googleLogin(code);
    this.setRefreshTokenCookie(res, result.refreshToken);
    const successUrl =
      this.config.get<string>('GOOGLE_LOGIN_SUCCESS_URL') ??
      'http://localhost:3000/user/oauth/google/success';
    res.redirect(successUrl);
  }

  @Post('refresh')
  async refresh(
    @Body() dto: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const token =
      dto.refreshToken ?? req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] ?? null;
    const result = await this.authService.refresh(token);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Body() dto: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: boolean }> {
    const refreshToken =
      dto.refreshToken ?? req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] ?? null;
    const result = await this.authService.logout(refreshToken);
    this.clearRefreshTokenCookie(res);
    return result;
  }

  @Get('activate')
  async activateByKey(
    @Query('key') key: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.activateAccountWithKey(key);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @Post('activate-code')
  async activateByCode(
    @Body() dto: ActivateCodeDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.activateAccountWithCode(dto);
    this.setRefreshTokenCookie(res, result.refreshToken);
    return result;
  }

  @Get('send-activation-code')
  sendActivationCode(@Query('email') email: string): Promise<void> {
    return this.authService.sendActivationCode(email);
  }

  @Get('send-email-activation')
  sendActivationEmail(@Query('email') email: string): Promise<void> {
    return this.authService.sendActivationEmail(email);
  }

  @Post('recover-password-code')
  recoverPasswordCode(@Body() dto: RecoverPasswordCodeDto): Promise<void> {
    return this.authService.recoverPasswordCode(dto);
  }

  @Post('verify-reset-code')
  verifyResetCode(@Body() dto: VerifyResetCodeDto): Promise<void> {
    return this.authService.verifyResetCode(dto);
  }

  @Post('reset-password-code')
  resetPasswordWithCode(@Body() dto: ResetPasswordCodeDto): Promise<void> {
    return this.authService.resetPasswordWithCode(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(
    @Body() dto: ChangePasswordDto,
    @CurrentUser() user: { id: number },
  ): Promise<{ success: boolean }> {
    return this.authService.changePassword(user.id, dto);
  }

  private setRefreshTokenCookie(
    res: Response,
    refreshToken: string | null,
  ): void {
    if (!refreshToken) {
      this.clearRefreshTokenCookie(res);
      return;
    }
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
    });
  }

  private clearRefreshTokenCookie(res: Response): void {
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 0,
    });
  }
}
