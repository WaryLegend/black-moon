import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryResponseDto } from "./dto/category-response.dto";
import { ListCategoriesQueryDto } from "./dto/list-categories-query.dto";
import { CategoriesListResponseDto } from "./dto/categories-list-response.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import type { Express } from "express";
import { BulkIdsCategoriesDto } from "./dto/bulk-soft-delete-categories.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(
    @Query() query: ListCategoriesQueryDto,
  ): Promise<CategoriesListResponseDto> {
    return this.categoriesService.getAll(query);
  }

  @Get("target-groups/:targetGroupSlug")
  getByTargetGroupSlug(
    @Param("targetGroupSlug") targetGroupSlug: string,
    @Query() query: ListCategoriesQueryDto,
  ): Promise<CategoriesListResponseDto> {
    return this.categoriesService.getPublicByTargetGroupSlug(
      targetGroupSlug,
      query,
    );
  }

  @Get(":slug")
  getBySlug(@Param("slug") slug: string): Promise<CategoryResponseDto> {
    return this.categoriesService.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.create(dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("bulk/soft-delete")
  bulkSoftDelete(
    @Body() dto: BulkIdsCategoriesDto,
  ): Promise<{ success: boolean; updatedCount: number }> {
    return this.categoriesService.bulkSoftDelete(dto.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @UseInterceptors(
    FileInterceptor("image", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.update(id, dto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return this.categoriesService.remove(id);
  }
}
