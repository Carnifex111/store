import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum EnumProductSort {
  HIGH_PRISE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductDto {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort;

  @IsOptional()
  @IsString()
  searchTerm?: string;
}

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  images: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
