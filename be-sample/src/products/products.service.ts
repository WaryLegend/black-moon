import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ProductResponseDto[]> {
    const products = await this.prisma.product.findMany({
      where: { isDeleted: false },
      include: { variants: true, images: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
    return products.map((product) => this.toProductResponse(product));
  }

  async getById(id: number): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
      include: { variants: true, images: true, category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toProductResponse(product);
  }

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        slug: dto.slug,
        isFeatured: dto.isFeatured ?? false,
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
        variants: dto.variants?.length
          ? {
              create: dto.variants.map((variant) => ({
                sku: variant.sku,
                color: variant.color,
                size: variant.size,
                quantity: variant.quantity,
                price: variant.price
                  ? new Prisma.Decimal(variant.price)
                  : undefined,
              })),
            }
          : undefined,
      },
      include: { variants: true, images: true, category: true },
    });

    return this.toProductResponse(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const existing = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        slug: dto.slug,
        isFeatured: dto.isFeatured,
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
      },
      include: { variants: true, images: true, category: true },
    });

    return this.toProductResponse(product);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const existing = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });

    return { success: true };
  }

  private toProductResponse(
    product: Product & {
      variants: Array<{
        id: number;
        sku: string | null;
        color: string | null;
        size: string | null;
        quantity: number | null;
        price: Prisma.Decimal | null;
      }>;
      images: Array<{
        id: number;
        publicUrl: string | null;
        gcsUrl: string | null;
      }>;
      category: { id: number; name: string | null; slug: string } | null;
    },
  ): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      slug: product.slug,
      isFeatured: product.isFeatured,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
          }
        : null,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        quantity: variant.quantity,
        price: variant.price ? variant.price.toNumber() : null,
      })),
      images: product.images.map((image) => ({
        id: image.id,
        publicUrl: image.publicUrl,
        gcsUrl: image.gcsUrl,
      })),
    };
  }
}
