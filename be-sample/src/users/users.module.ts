import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';
import { PermissionsGuard } from '@/authorization/guards/permissions.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CloudStorageService, PermissionsGuard],
  exports: [UsersService],
})
export class UsersModule {}
