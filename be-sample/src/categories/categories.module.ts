import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CloudStorageService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
