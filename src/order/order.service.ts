import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './create-dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { productIds } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        userId,
        items: {
          create: productIds.map((productId) => ({
            quantity: 1,
            price: 0,
            product: {
              connect: { id: productId },
            },
          })),
        },
      },
      include: {
        items: true,
        user: true,
      },
    });
    console.log(order);
    return order;
  }
}
