import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  beforeEach(async () => {
    service = {
      addToCart: jest.fn().mockResolvedValue({ cartId: 1, productId: 1, quantity: 1 }),
      getCart: jest.fn(),
      updateCart: jest.fn(),
      removeFromCart: jest.fn()
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [{ provide: CartService, useValue: service }],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should add item to cart', async () => {
    const updateCartDto = { userId: 1, productId: 1, quantity: 1 };

    expect(await controller.addToCart(updateCartDto)).toEqual({ cartId: 1, productId: 1, quantity: 1 });
  });

  it('should get cart', async () => {
    const userId = 1;
    service.getCart = jest.fn().mockResolvedValue({ userId, items: [] });

    expect(await controller.getCart(userId)).toEqual({ userId, items: [] });
  });

  it('should update cart', async () => {
    const updateCartDto = { userId: 1, productId: 1, quantity: 2 };
    service.updateCart = jest.fn().mockResolvedValue({ cartId: 1, productId: 1, quantity: 2 });

    expect(await controller.updateCart(updateCartDto)).toEqual({ cartId: 1, productId: 1, quantity: 2 });
  });

  it('should remove item from cart', async () => {
    const removeItemDto = { userId: 1, productId: 1 };
    service.removeFromCart = jest.fn().mockResolvedValue({ message: 'Product removed from cart' });

    expect(await controller.removeFromCart(removeItemDto)).toEqual({ message: 'Product removed from cart' });
  });
});