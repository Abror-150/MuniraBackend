import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Check if product exists
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string): Promise<Product> {
    // Check if product exists
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async search(
    query: string,
    lang: 'uz' | 'en' | 'ru' = 'uz',
  ): Promise<Product[]> {
    const nameField = `name_${lang}`;
    const descField = `description_${lang}`;

    return this.prisma.product.findMany({
      where: {
        OR: [
          { [nameField]: { contains: query, mode: 'insensitive' } },
          { [descField]: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      orderBy: {
        price: 'asc',
      },
    });
  }
}
