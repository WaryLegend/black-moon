import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Express } from 'express';
import { PrismaService } from '@/prisma/prisma.service';
import { CloudStorageService } from '@/common/storage/cloud-storage.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import {
  CategorySortField,
  CategorySortOrder,
  ListCategoriesQueryDto,
} from './dto/list-categories-query.dto';
import { CategoriesListResponseDto } from './dto/categories-list-response.dto';

const CATEGORY_PAGE_SIZE = 10;

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: CloudStorageService,
  ) {}

  async getAll(
    query: ListCategoriesQueryDto,
  ): Promise<CategoriesListResponseDto> {
    const page = query.page ?? 1;
    const where = this.buildListWhereClause(query);
    const orderBy = this.buildOrderBy(
      query.sortField ?? 'createdAt',
      query.sortOrder ?? 'desc',
    );
    const skip = (page - 1) * CATEGORY_PAGE_SIZE;

    const categories = await this.prisma.category.findMany({
      where,
      include: { targetGroup: true },
      orderBy,
      skip,
      take: CATEGORY_PAGE_SIZE,
    });

    const totalItems = await this.prisma.category.count({ where });
    const totalPages = totalItems
      ? Math.ceil(totalItems / CATEGORY_PAGE_SIZE)
      : 0;

    return {
      items: categories.map((category) => this.toResponse(category)),
      meta: {
        page,
        pageSize: CATEGORY_PAGE_SIZE,
        totalItems,
        totalPages,
      },
    };
  }

  async getPublicByTargetGroupSlug(
    targetGroupSlug: string,
    query: ListCategoriesQueryDto,
  ): Promise<CategoriesListResponseDto> {
    const page = query.page ?? 1;
    const where = this.buildPublicByTargetGroupWhereClause(
      targetGroupSlug,
      query,
    );
    const orderBy = this.buildOrderBy(
      query.sortField ?? 'createdAt',
      query.sortOrder ?? 'desc',
    );
    const skip = (page - 1) * CATEGORY_PAGE_SIZE;

    const categories = await this.prisma.category.findMany({
      where,
      include: { targetGroup: true },
      orderBy,
      skip,
      take: CATEGORY_PAGE_SIZE,
    });

    const totalItems = await this.prisma.category.count({ where });
    const totalPages = totalItems
      ? Math.ceil(totalItems / CATEGORY_PAGE_SIZE)
      : 0;

    return {
      items: categories.map((category) => this.toResponse(category)),
      meta: {
        page,
        pageSize: CATEGORY_PAGE_SIZE,
        totalItems,
        totalPages,
      },
    };
  }

  async getBySlug(slug: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findUnique({
      where: { slug: slug.trim().toLowerCase() },
      include: { targetGroup: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.toResponse(category);
  }

  async create(
    dto: CreateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<CategoryResponseDto> {
    await this.validateTargetGroupId(dto.targetGroupId);

    this.validateImageFile(file);

    const normalizedName = dto.name.trim();
    const normalizedSlug = dto.slug.trim().toLowerCase();
    let createdCategoryId: number | null = null;

    try {
      const createdCategory = await this.prisma.category.create({
        data: {
          name: normalizedName,
          slug: normalizedSlug,
          imageUrl: null,
          imageName: null,
          isDeleted: false,
          targetGroup: { connect: { id: dto.targetGroupId } },
        },
        include: { targetGroup: true },
      });
      createdCategoryId = createdCategory.id;

      if (!file) {
        return this.toResponse(createdCategory);
      }

      const uploaded = await this.storage.uploadPublicFile(
        file,
        `categories/${createdCategory.id}`,
      );

      try {
        const categoryWithImage = await this.prisma.category.update({
          where: { id: createdCategory.id },
          data: {
            imageUrl: uploaded.publicUrl,
            imageName: uploaded.objectName,
          },
          include: { targetGroup: true },
        });

        return this.toResponse(categoryWithImage);
      } catch (error) {
        await this.storage.deleteFile(uploaded.objectName).catch(() => {});
        throw error;
      }
    } catch (error) {
      if (file && createdCategoryId !== null) {
        await this.prisma.category
          .delete({ where: { id: createdCategoryId } })
          .catch(() => {});
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Category slug already exists');
      }
      throw error;
    }
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ): Promise<CategoryResponseDto> {
    const existing = await this.getEntityByIdOrThrow(id);

    this.validateImageFile(file);

    if (!this.hasUpdatePayload(dto, file)) {
      throw new BadRequestException('No category fields were provided');
    }

    if (dto.targetGroupId !== undefined) {
      await this.validateTargetGroupId(dto.targetGroupId);
    }

    const uploaded = file
      ? await this.storage.uploadPublicFile(file, `categories/${existing.id}`)
      : null;

    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: {
          name: dto.name !== undefined ? dto.name.trim() : undefined,
          slug:
            dto.slug !== undefined ? dto.slug.trim().toLowerCase() : undefined,
          imageUrl: uploaded ? uploaded.publicUrl : undefined,
          imageName: uploaded ? uploaded.objectName : undefined,
          targetGroup:
            dto.targetGroupId !== undefined
              ? { connect: { id: dto.targetGroupId } }
              : undefined,
        },
        include: { targetGroup: true },
      });

      if (uploaded && existing.imageName) {
        await this.storage.deleteFile(existing.imageName).catch(() => {});
      }

      return this.toResponse(category);
    } catch (error) {
      if (uploaded) {
        await this.storage.deleteFile(uploaded.objectName).catch(() => {});
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Category slug already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<{ success: boolean }> {
    await this.getEntityByIdOrThrow(id);
    await this.prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
    return { success: true };
  }

  async bulkSoftDelete(
    ids: number[],
  ): Promise<{ success: boolean; updatedCount: number }> {
    const result = await this.prisma.category.updateMany({
      where: {
        id: { in: ids },
        isDeleted: false,
      },
      data: { isDeleted: true },
    });

    return {
      success: true,
      updatedCount: result.count,
    };
  }

  private buildListWhereClause(
    query: ListCategoriesQueryDto,
  ): Prisma.CategoryWhereInput {
    const where: Prisma.CategoryWhereInput = {};

    if (query.groups?.length) {
      where.targetGroup = {
        slug: {
          in: query.groups,
        },
      };
    }

    const trimmedSearch = query.search?.trim();
    if (trimmedSearch) {
      where.OR = [
        { name: { contains: trimmedSearch } },
        { slug: { contains: trimmedSearch } },
      ];
    }

    return where;
  }

  private buildPublicByTargetGroupWhereClause(
    targetGroupSlug: string,
    query: ListCategoriesQueryDto,
  ): Prisma.CategoryWhereInput {
    const where: Prisma.CategoryWhereInput = {
      isDeleted: false,
      targetGroup: {
        slug: targetGroupSlug.trim().toLowerCase(),
        isDeleted: false,
      },
    };

    const trimmedSearch = query.search?.trim();
    if (trimmedSearch) {
      where.OR = [
        { name: { contains: trimmedSearch } },
        { slug: { contains: trimmedSearch } },
      ];
    }

    return where;
  }

  private buildOrderBy(
    field: CategorySortField,
    order: CategorySortOrder,
  ): Prisma.CategoryOrderByWithRelationInput {
    const direction: Prisma.SortOrder = order === 'asc' ? 'asc' : 'desc';
    if (field === 'name') {
      return { name: direction };
    }
    return { createdAt: direction };
  }

  private async getEntityByIdOrThrow(id: number): Promise<{
    id: number;
    imageName: string | null;
  }> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: { id: true, imageName: true },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  private validateImageFile(file?: Express.Multer.File): void {
    if (!file) {
      return;
    }
    if (!file.mimetype?.startsWith('image/')) {
      throw new BadRequestException('Category image must be an image');
    }
  }

  private hasUpdatePayload(
    dto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ): boolean {
    return (
      dto.name !== undefined ||
      dto.slug !== undefined ||
      dto.targetGroupId !== undefined ||
      file !== undefined
    );
  }

  private async validateTargetGroupId(targetGroupId: number): Promise<void> {
    const targetGroup = await this.prisma.targetGroup.findUnique({
      where: { id: targetGroupId },
      select: { id: true },
    });

    if (!targetGroup) {
      throw new BadRequestException('targetGroupId is invalid');
    }
  }

  private toResponse(category: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    imageName: string | null;
    createdAt: Date;
    updatedAt: Date;
    targetGroup: { id: number; name: string };
  }): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      imageUrl: category.imageUrl,
      imageName: category.imageName,
      targetGroup: {
        id: category.targetGroup.id,
        name: category.targetGroup.name,
      },
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
  }
}
