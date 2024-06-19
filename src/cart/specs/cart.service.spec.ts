import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { prismaMock, PrismaMockService } from '../../prisma/prisma.service.mock';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCartDto } from '../DTOs/update-cart.dto';

describe('CartService', () => {
  let service: CartService;
  let prismaMockService: PrismaMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prismaMockService = module.get<PrismaMockService>(PrismaService);
  });

  it('should add item to cart', async () => {
    const updateCartDto = { userId: 1, productId: 1, quantity: 1 };
    prismaMockService.cart.upsert.mockResolvedValue({ cartId: 1, userId: 1 });
    prismaMockService.cartItem.upsert.mockResolvedValue({ cartId: 1, productId: 1, quantity: 1 });

    expect(await service.addToCart(updateCartDto)).toEqual({ cartId: 1, productId: 1, quantity: 1 });
  });
    it('should get cart', async () => {
    const userId = 1;
    prismaMockService.cart.findUnique.mockResolvedValue({ userId, items: [] });

    expect(await service.getCart(userId)).toEqual({ userId, items: [] });
  });

  it('should update cart', async () => {
    const updateCartDto = { userId: 1, productId: 1, quantity: 2 };
    prismaMockService.cart.findUnique.mockResolvedValue({ cartId: 1, userId: 1 });
    prismaMockService.cartItem.update.mockResolvedValue({ cartId: 1, productId: 1, quantity: 2 });

    expect(await service.updateCart(updateCartDto)).toEqual({ cartId: 1, productId: 1, quantity: 2 });
  });

  it('should remove item from cart', async () => {
    const removeItemDto = { userId: 1, productId: 1 };
    prismaMockService.cart.findUnique.mockResolvedValue({ cartId: 1, userId: 1 });
    prismaMockService.cartItem.delete.mockResolvedValue({});

    expect(await service.removeFromCart(removeItemDto)).toEqual({ message: 'Product removed from cart' });
  });

  it('should remove item from cart when quantity less than 1', async () => {
    const UpdateCartDto:UpdateCartDto = { userId: 1, productId: 1, quantity: 0 };
    prismaMockService.cart.findUnique.mockResolvedValue({ cartId: 1, userId: 1 });
    prismaMockService.cartItem.delete.mockResolvedValue({});

    expect(await service.updateCart(UpdateCartDto)).toEqual({ message: 'Product removed from cart' });
  });
});