import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteReviewDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;
}
