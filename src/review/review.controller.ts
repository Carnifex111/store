import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  async getReviewById(@Param('id') id: number) {
    return this.reviewService.getReviewById(id);
  }

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Delete(':id')
  async deleteReview(
    @Param('id') id: number,
    @Body() deleteReviewDto: DeleteReviewDto,
  ) {
    return this.reviewService.deleteReview(id, deleteReviewDto);
  }
}
