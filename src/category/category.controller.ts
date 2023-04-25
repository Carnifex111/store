import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { Category } from '.prisma/client'; // Импортируем модель Category из Prisma-схемы
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @Auth()
  createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Patch(':id')
  @Auth()
  updateCategory(
    @Param('id') id: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, categoryDto);
  }

  @Delete(':id')
  @Auth()
  deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategoryById(id);
  }
}
