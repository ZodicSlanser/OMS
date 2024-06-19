import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PrismaModule, CartModule, OrderModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
