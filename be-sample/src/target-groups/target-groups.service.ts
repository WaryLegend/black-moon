import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateTargetGroupDto } from './dto/create-target-group.dto';
import { UpdateTargetGroupDto } from './dto/update-target-group.dto';
import { TargetGroupResponseDto } from './dto/target-group-response.dto';
import {
  ListTargetGroupsQueryDto,
  TargetGroupSortField,
  TargetGroupSortOrder,
} from './dto/list-target-groups-query.dto';
import { TargetGroupsListResponseDto } from './dto/target-groups-list-response.dto';

const TARGET_GROUP_PAGE_SIZE = 10;

@Injectable()
export class TargetGroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublic(): Promise<TargetGroupResponseDto[]> {
    const targetGroups = await this.prisma.targetGroup.findMany({
      where: { isDeleted: false },
      orderBy: { name: 'asc' },
    });

    return targetGroups.map((targetGroup) => this.toResponse(targetGroup));
  }

  async getAll(
    query: ListTargetGroupsQueryDto,
  ): Promise<TargetGroupsListResponseDto> {
    const page = query.page ?? 1;
    const where = this.buildListWhereClause(query);
    const orderBy = this.buildOrderBy(
      query.sortField ?? 'createdAt',
      query.sortOrder ?? 'desc',
    );
    const skip = (page - 1) * TARGET_GROUP_PAGE_SIZE;

    const [targetGroups, totalItems] = await Promise.all([
      this.prisma.targetGroup.findMany({
        where,
        orderBy,
        skip,
        take: TARGET_GROUP_PAGE_SIZE,
      }),
      this.prisma.targetGroup.count({ where }),
    ]);

    const totalPages = totalItems
      ? Math.ceil(totalItems / TARGET_GROUP_PAGE_SIZE)
      : 0;

    return {
      items: targetGroups.map((targetGroup) => this.toResponse(targetGroup)),
      meta: {
        page,
        pageSize: TARGET_GROUP_PAGE_SIZE,
        totalItems,
        totalPages,
      },
    };
  }

  private buildListWhereClause(
    query: ListTargetGroupsQueryDto,
  ): Prisma.TargetGroupWhereInput {
    const rawSearch: unknown = query.search;
    if (typeof rawSearch !== 'string') {
      return {};
    }

    const search = rawSearch.trim();

    if (!search) {
      return {};
    }

    return {
      OR: [{ name: { contains: search } }, { slug: { contains: search } }],
    };
  }

  private buildOrderBy(
    field: TargetGroupSortField,
    order: TargetGroupSortOrder,
  ): Prisma.TargetGroupOrderByWithRelationInput {
    const direction: Prisma.SortOrder = order === 'asc' ? 'asc' : 'desc';
    if (field === 'name') {
      return { name: direction };
    }
    return { createdAt: direction };
  }

  async getBySlug(slug: string): Promise<TargetGroupResponseDto> {
    const targetGroup = await this.prisma.targetGroup.findUnique({
      where: { slug: this.normalizeSlug(slug) },
    });

    if (!targetGroup) {
      throw new NotFoundException('Target group not found');
    }

    return this.toResponse(targetGroup);
  }

  async create(dto: CreateTargetGroupDto): Promise<TargetGroupResponseDto> {
    try {
      const normalizedName = dto.name.trim();
      const slug = await this.buildUniqueSlug(dto.slug ?? normalizedName);

      const targetGroup = await this.prisma.targetGroup.create({
        data: {
          name: normalizedName,
          slug,
        },
      });
      return this.toResponse(targetGroup);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Target group slug already exists');
      }
      throw error;
    }
  }

  async update(
    id: number,
    dto: UpdateTargetGroupDto,
  ): Promise<TargetGroupResponseDto> {
    const existing = await this.getEntityByIdOrThrow(id);

    try {
      const nextName = dto.name !== undefined ? dto.name.trim() : existing.name;
      const nextSlug =
        dto.slug !== undefined || dto.name !== undefined
          ? await this.buildUniqueSlug(dto.slug ?? nextName, existing.id)
          : undefined;

      const targetGroup = await this.prisma.targetGroup.update({
        where: { id: existing.id },
        data: {
          name: dto.name !== undefined ? nextName : undefined,
          slug: nextSlug,
        },
      });
      return this.toResponse(targetGroup);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Target group slug already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const existing = await this.getEntityByIdOrThrow(id);
    await this.prisma.targetGroup.update({
      where: { id: existing.id },
      data: { isDeleted: true },
    });
    return { success: true };
  }

  async bulkSoftDelete(
    ids: number[],
  ): Promise<{ success: boolean; updatedCount: number }> {
    const result = await this.prisma.targetGroup.updateMany({
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

  private async getEntityByIdOrThrow(id: number): Promise<{
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const targetGroup = await this.prisma.targetGroup.findUnique({
      where: { id },
    });
    if (!targetGroup) {
      throw new NotFoundException('Target group not found');
    }
    return targetGroup;
  }

  private normalizeSlug(value: string): string {
    return value.trim().toLowerCase();
  }

  private toSlug(value: string): string {
    const asciiValue = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    const slug = asciiValue
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return slug || 'target-group';
  }

  private async buildUniqueSlug(
    source: string,
    excludeId?: number,
  ): Promise<string> {
    const baseSlug = this.toSlug(source);
    let candidate = baseSlug;
    let suffix = 1;

    while (true) {
      const existing = await this.prisma.targetGroup.findUnique({
        where: { slug: candidate },
        select: { id: true },
      });

      if (!existing || (excludeId !== undefined && existing.id === excludeId)) {
        return candidate;
      }

      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;
    }
  }

  private toResponse(targetGroup: {
    id: number;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }): TargetGroupResponseDto {
    return {
      id: targetGroup.id,
      name: targetGroup.name,
      slug: targetGroup.slug,
      createdAt: targetGroup.createdAt.toISOString(),
      updatedAt: targetGroup.updatedAt.toISOString(),
    };
  }
}
