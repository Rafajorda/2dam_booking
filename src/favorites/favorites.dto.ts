import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    example: 1,
    description: 'ID del usuario',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'uuid-product-123',
    description: 'ID del producto',
  })
  @IsString()
  @IsNotEmpty()
  productId: string;
}
