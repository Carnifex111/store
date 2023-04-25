import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryDto } from './category.dto';
import { Category } from '.prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return category;
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    return this.prismaService.category.create({ data: categoryDto });
  }

  async updateCategory(
    id: number,
    categoryDto: CategoryDto,
  ): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return this.prismaService.category.update({
      where: { id },
      data: categoryDto,
    });
  }

  async deleteCategoryById(id: number): Promise<void> {
    const category = await this.prismaService.category.delete({
      where: { id: Number(id) },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
