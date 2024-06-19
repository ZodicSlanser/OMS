import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  userId: number;

  @IsInt()
  @IsOptional()
  productId: number;

  @IsOptional()
  @IsPositive()
  quantity: number;
}