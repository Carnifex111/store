import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async getReviewById(id: number) {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }
    return review;
  }

  async createReview(createReviewDto: CreateReviewDto) {
    const { rating, text, userId, productId } = createReviewDto;
    return this.prismaService.review.create({
      data: { rating, text, userId, productId },
    });
  }

  async deleteReview(id: number, deleteReviewDto: DeleteReviewDto) {
    const { userId, productId } = deleteReviewDto;
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID "${id}" not found`);
    }
    if (review.userId !== userId || review.productId !== productId) {
      throw new NotFoundException(
        `Review with ID "${id}" not found for the given user and product`,
      );
    }
    return this.prismaService.review.delete({ where: { id } });
  }
}
