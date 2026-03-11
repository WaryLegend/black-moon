import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CloudStorageService],
  exports: [UsersService],
})
export class UsersModule {}
