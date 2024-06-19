import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCartDto } from './DTOs/update-cart.dto';
import { RemoveItemDto } from './DTOs/remove-item.dto';


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  /**
   * Adds a product to the cart or updates the quantity of the product in the cart.
   * @param {UpdateCartDto} updateCartDto - The data transfer object containing the user ID, product ID, and quantity.
   * @returns {Promise} A promise that resolves to the updated or created cart item.
   */
  async addToCart(updateCartDto: UpdateCartDto) {
    const { userId, productId, quantity } = updateCartDto;
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    return this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId,
        },
      },
      update: { quantity: { increment: quantity } },
      create: {
        cartId: cart.cartId,
        productId,
        quantity,
      },
    });
  }

  /**
   * Retrieves the cart for a specific user.
   * @param {number} userId - The ID of the user.
   * @returns {Promise} A promise that resolves to the cart of the user.
   */
  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }

  /**
   * Updates the quantity of a product in the cart. If the quantity is less than 1, the product is removed from the cart.
   * @param {UpdateCartDto} updateCartDto - The data transfer object containing the user ID, product ID, and quantity.
   * @returns {Promise} A promise that resolves to the updated cart item, or a message indicating that the product was removed.
   */
  async updateCart(updateCartDto: UpdateCartDto) {
    const { userId, productId, quantity } = updateCartDto;
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) throw new Error('Cart not found');

    if(quantity < 1){
      await this.prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.cartId,
            productId,
          },
        },
      });
      return { message: 'Product removed from cart' };
    }

    return this.prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId,
        },
      },
      data: { quantity },
    });
  }

  /**
   * Removes a product from the cart.
   * @param {RemoveItemDto} removeItemDto - The data transfer object containing the user ID and product ID.
   * @returns {Promise} A promise that resolves to a message indicating that the product was removed.
   */
  async removeFromCart(removeItemDto: RemoveItemDto) {
    const { userId, productId } = removeItemDto;
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) throw new Error('Cart not found');

    await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.cartId,
          productId,
        },
      },
    });

    return { message: 'Product removed from cart' };
  }
}