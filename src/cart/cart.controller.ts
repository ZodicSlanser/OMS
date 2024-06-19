import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './DTOs/update-cart.dto';
import { RemoveItemDto } from './DTOs/remove-item.dto';


@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  /**
   * Adds a product to the cart or updates the quantity of the product in the cart.
   * @route POST /cart/add
   * @param {UpdateCartDto} updateCartDto - The data transfer object containing the user ID, product ID, and quantity.
   * @returns {Promise} A promise that resolves to the updated or created cart item.
   */
  @Post('add')
  addToCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.addToCart(updateCartDto);
  }

  /**
   * Retrieves the cart for a specific user.
   * @route GET /cart/:userId
   * @param {number} userId - The ID of the user.
   * @returns {Promise} A promise that resolves to the cart of the user.
   */
  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  /**
   * Updates the quantity of a product in the cart. If the quantity is less than 1, the product is removed from the cart.
   * @route PUT /cart/update
   * @param {UpdateCartDto} updateCartDto - The data transfer object containing the user ID, product ID, and quantity.
   * @returns {Promise} A promise that resolves to the updated cart item, or a message indicating that the product was removed.
   */
  @Put('update')
  updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto);
  }

  /**
   * Removes a product from the cart.
   * @route DELETE /cart/remove
   * @param {RemoveItemDto} removeItemDto - The data transfer object containing the user ID and product ID.
   * @returns {Promise} A promise that resolves to a message indicating that the product was removed.
   */
  @Delete('remove')
  removeFromCart(@Body() removeItemDto : RemoveItemDto) {
    return this.cartService.removeFromCart(removeItemDto);
  }
}