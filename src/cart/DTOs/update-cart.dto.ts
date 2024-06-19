import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class UpdateCartDto {
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}