import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Gender, Prisma } from '@prisma/client';
import type { Express } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';
import {
  ListUsersQueryDto,
  UserSortField,
  UserSortOrder,
} from './dto/list-users-query.dto';
import { UsersListResponseDto } from './dto/users-list-response.dto';
import { CreateUserDto } from './dto/create-user.dto';

type AuthenticatedUser = {
  id: number;
  role: string | null;
};

const USER_PAGE_SIZE = 10;

@Injectable()
export class UsersService {
  private readonly userInclude = {
    profile: true,
    role: { select: { id: true, name: true, priority: true } },
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: CloudStorageService,
  ) {}

  async listUsers(query: ListUsersQueryDto): Promise<UsersListResponseDto> {
    const page = query.page ?? 1;
    const where = this.buildListWhereClause(query);
    const orderBy = this.buildOrderBy(
      query.sortField ?? 'createdAt',
      query.sortOrder ?? 'desc',
    );
    const skip = (page - 1) * USER_PAGE_SIZE;

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: this.userInclude,
        skip,
        take: USER_PAGE_SIZE,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = totalItems ? Math.ceil(totalItems / USER_PAGE_SIZE) : 0;

    return {
      items: users.map((user) => this.toUserResponse(user)),
      meta: {
        page,
        pageSize: USER_PAGE_SIZE,
        totalItems,
        totalPages,
      },
    };
  }

  async getUserById(userId: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: this.userInclude,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponse(user);
  }

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const role = await this.findRoleOrThrow(dto.roleName);
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const profilePayload = this.buildProfilePayloadFromCreateDto(dto);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          activated: dto.activated ?? false,
          role: { connect: { id: role.id } },
          profile: profilePayload ? { create: profilePayload } : undefined,
          point: { create: {} },
        },
        include: this.userInclude,
      });
      return this.toUserResponse(user);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async getMe(userId: number): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: this.userInclude,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
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

    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profile: true },
    });
    if (!userWithProfile) {
      throw new NotFoundException('User not found');
    }

    const previousAvatarName = userWithProfile.profile?.avatarName ?? null;
    const uploadResult = await this.storage.uploadPublicFile(
      file,
      `avatars/${userId}`,
    );

    const avatarPayload = {
      avatarUrl: uploadResult.publicUrl,
      avatarName: uploadResult.objectName,
    };

    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          profile: userWithProfile.profile
            ? {
                update: avatarPayload,
              }
            : {
                create: avatarPayload,
              },
        },
        include: this.userInclude,
      });

      if (previousAvatarName) {
        await this.storage.deleteFile(previousAvatarName).catch(() => {});
      }

      return this.toUserResponse(user);
    } catch (error) {
      await this.storage.deleteFile(uploadResult.objectName).catch(() => {});
      throw error;
    }
  }

  async updateProfileByUserId(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    if (!this.hasProfilePayload(dto)) {
      throw new BadRequestException('No profile fields were provided');
    }

    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profile: true },
    });
    if (!userWithProfile) {
      throw new NotFoundException('User not found');
    }
    const existingProfile = userWithProfile.profile;

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
      include: this.userInclude,
    });
    return this.toUserResponse(user);
  }

  async updateUserActivation(
    targetUserId: number,
    activated: boolean,
    actor: AuthenticatedUser,
  ): Promise<UserResponseDto> {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      include: this.userInclude,
    });
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    await this.assertCanManageTarget(actor.id, targetUser);

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { activated },
      include: this.userInclude,
    });
    return this.toUserResponse(updated);
  }

  async updateUserRole(
    targetUserId: number,
    nextRoleName: string,
    actor: AuthenticatedUser,
  ): Promise<UserResponseDto> {
    const normalizedRole = this.normalizeRoleName(nextRoleName);
    const [targetUser, role] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: targetUserId },
        include: this.userInclude,
      }),
      this.findRoleOrThrow(normalizedRole),
    ]);

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    await this.assertCanManageTarget(actor.id, targetUser, role.priority);

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { role: { connect: { id: role.id } } },
      include: this.userInclude,
    });
    return this.toUserResponse(updated);
  }

  private buildListWhereClause(
    query: ListUsersQueryDto,
  ): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (query.role) {
      where.role = { name: query.role };
    }

    if (query.activated !== undefined) {
      where.activated = query.activated;
    }

    const trimmedSearch = query.search?.trim();
    if (trimmedSearch) {
      where.OR = [
        { email: { contains: trimmedSearch } },
        {
          profile: {
            fullName: { contains: trimmedSearch },
          },
        },
        {
          profile: {
            firstName: { contains: trimmedSearch },
          },
        },
        {
          profile: {
            lastName: { contains: trimmedSearch },
          },
        },
      ];
    }

    return where;
  }

  private buildOrderBy(
    field: UserSortField,
    order: UserSortOrder,
  ): Prisma.UserOrderByWithRelationInput {
    const direction: Prisma.SortOrder = order === 'asc' ? 'asc' : 'desc';
    if (field === 'firstName') {
      return { profile: { firstName: direction } };
    }
    if (field === 'lastName') {
      return { profile: { lastName: direction } };
    }
    return { createdAt: direction };
  }

  private async findRoleOrThrow(
    roleName: string,
  ): Promise<{ id: number; name: string; priority: number }> {
    const normalized = this.normalizeRoleName(roleName);
    const role = await this.prisma.role.findUnique({
      where: { name: normalized },
      select: { id: true, name: true, priority: true },
    });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return role;
  }

  private normalizeRoleName(roleName: string): string {
    return roleName?.trim().toUpperCase();
  }

  private buildProfilePayloadFromCreateDto(dto: CreateUserDto): {
    firstName: string | null;
    lastName: string | null;
    fullName: string | null;
    phoneNumber: string | null;
    birthDate: Date | null;
    gender: Gender | null;
  } | null {
    const firstName = dto.firstName?.trim() ?? null;
    const lastName = dto.lastName?.trim() ?? null;
    const phoneNumber = dto.phoneNumber?.trim() ?? null;
    const birthDate = dto.birthDate ? new Date(dto.birthDate) : null;
    const gender = dto.gender ?? null;

    if (
      firstName === null &&
      lastName === null &&
      phoneNumber === null &&
      birthDate === null &&
      gender === null
    ) {
      return null;
    }

    return {
      firstName,
      lastName,
      fullName: this.buildFullName(lastName, firstName),
      phoneNumber,
      birthDate,
      gender,
    };
  }

  private async assertCanManageTarget(
    actorId: number,
    target: { id: number; role: { name: string; priority: number } | null },
    requestedRolePriority?: number,
  ): Promise<void> {
    if (actorId === target.id) {
      throw new ForbiddenException('You cannot modify your own permissions');
    }

    const actorPriority = await this.getRolePriorityForUser(actorId);
    const targetPriority = target.role?.priority ?? 0;

    if (actorPriority <= targetPriority) {
      throw new ForbiddenException('You cannot manage this user');
    }

    if (
      requestedRolePriority !== undefined &&
      actorPriority < requestedRolePriority
    ) {
      throw new ForbiddenException('You cannot assign this role');
    }
  }

  private async getRolePriorityForUser(userId: number): Promise<number> {
    const actor = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: { select: { priority: true } } },
    });
    return actor?.role?.priority ?? 0;
  }

  private toUserResponse(user: {
    id: number;
    email: string;
    activated: boolean;
    lastLogin: Date | null;
    createdAt: Date;
    role: { id: number; name: string; priority: number } | null;
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
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
            priority: user.role.priority,
          }
        : null,
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
