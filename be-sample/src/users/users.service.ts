import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: CloudStorageService,
  ) {}

  async getMe(userId: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, role: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponse(user);
  }

  async updateProfile(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    if (!this.hasProfilePayload(dto)) {
      throw new BadRequestException('No profile fields were provided');
    }

    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    const nextFirstName =
      dto.firstName !== undefined
        ? dto.firstName
        : (existingProfile?.firstName ?? null);
    const nextLastName =
      dto.lastName !== undefined
        ? dto.lastName
        : (existingProfile?.lastName ?? null);
    const nextBirthDate =
      dto.birthDate !== undefined
        ? new Date(dto.birthDate)
        : (existingProfile?.birthDate ?? null);
    const nextPhoneNumber =
      dto.phoneNumber !== undefined
        ? dto.phoneNumber
        : (existingProfile?.phoneNumber ?? null);
    const nextGender =
      dto.gender !== undefined ? dto.gender : (existingProfile?.gender ?? null);
    const computedFullName =
      this.buildFullName(nextLastName, nextFirstName) ??
      existingProfile?.fullName ??
      null;

    const profilePayload = {
      firstName: nextFirstName,
      lastName: nextLastName,
      fullName: computedFullName,
      birthDate: nextBirthDate,
      phoneNumber: nextPhoneNumber,
      gender: nextGender,
    };

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: existingProfile
          ? { update: profilePayload }
          : { create: profilePayload },
      },
      include: { profile: true, role: true },
    });
    return this.toUserResponse(user);
  }

  async updateAvatar(
    userId: number,
    file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    if (!file) {
      throw new BadRequestException('Avatar file is required');
    }
    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Avatar must be an image');
    }

    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    const uploadResult = await this.storage.uploadPublicFile(
      file,
      `avatars/${userId}`,
    );
    // delete avatar cũ
    if (existingProfile?.avatarName) {
      await this.storage.deleteFile(existingProfile.avatarName).catch(() => {});
    }

    const avatarPayload = {
      avatarUrl: uploadResult.publicUrl,
      avatarName: uploadResult.objectName,
    };

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        profile: existingProfile
          ? {
              update: avatarPayload,
            }
          : {
              create: avatarPayload,
            },
      },
      include: { profile: true, role: true },
    });
    return this.toUserResponse(user);
  }

  private toUserResponse(user: {
    id: number;
    email: string;
    activated: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    role: { id: number; name: string } | null;
    profile: {
      firstName: string | null;
      lastName: string | null;
      fullName: string | null;
      birthDate: Date | null;
      phoneNumber: string | null;
      gender: string | null;
      avatarUrl: string | null;
      avatarName: string | null;
    } | null;
  }): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      activated: user.activated,
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.lastLogin?.toISOString() ?? null,
      role: user.role ? { id: user.role.id, name: user.role.name } : null,
      profile: user.profile
        ? {
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            fullName: user.profile.fullName,
            birthDate: user.profile.birthDate?.toISOString() ?? null,
            phoneNumber: user.profile.phoneNumber,
            gender: user.profile.gender,
            avatarUrl: user.profile.avatarUrl,
            avatarName: user.profile.avatarName,
          }
        : null,
    };
  }

  private hasProfilePayload(dto: UpdateProfileDto): boolean {
    return (
      dto.firstName !== undefined ||
      dto.lastName !== undefined ||
      dto.birthDate !== undefined ||
      dto.phoneNumber !== undefined ||
      dto.gender !== undefined
    );
  }

  private buildFullName(
    lastName: string | null,
    firstName: string | null,
  ): string | null {
    const parts = [lastName, firstName]
      .map((value) => value?.trim())
      .filter((value): value is string => Boolean(value));
    if (!parts.length) {
      return null;
    }
    return parts.join(' ');
  }
}
