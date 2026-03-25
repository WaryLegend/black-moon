import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { PermissionsGuard } from '@/authorization/guards/permissions.guard';
import { Permissions } from '@/authorization/decorators/permissions.decorator';
import { PermissionCode } from '@/authorization/constants/permissions.constant';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UsersListResponseDto } from './dto/users-list-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserActivationDto } from './dto/update-user-activation.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_READ)
  listUsers(@Query() query: ListUsersQueryDto): Promise<UsersListResponseDto> {
    return this.usersService.listUsers(query);
  }

  @Get('me')
  getMe(@CurrentUser() user: { id: number }): Promise<UserResponseDto> {
    return this.usersService.getMe(user.id);
  }

  @Patch('me')
  updateProfile(
    @CurrentUser() user: { id: number },
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateProfileByUserId(user.id, dto);
  }

  @Put('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  updateAvatar(
    @CurrentUser() user: { id: number },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    return this.usersService.updateAvatar(user.id, file);
  }

  @Get(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_READ)
  getUserById(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_CREATE)
  createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_UPDATE)
  updateUserProfile(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateProfileByUserId(userId, dto);
  }

  @Patch(':id/activation')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_UPDATE)
  updateUserActivation(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserActivationDto,
    @CurrentUser() actor: { id: number; role: string | null },
  ): Promise<UserResponseDto> {
    return this.usersService.updateUserActivation(userId, dto.activated, actor);
  }

  @Patch(':id/role')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionCode.USER_UPDATE)
  updateUserRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserRoleDto,
    @CurrentUser() actor: { id: number; role: string | null },
  ): Promise<UserResponseDto> {
    return this.usersService.updateUserRole(userId, dto.roleName, actor);
  }
}
