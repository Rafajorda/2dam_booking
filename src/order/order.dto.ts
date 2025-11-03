import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'order-123',
    description: 'Slug único de la orden',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 150.50,
    description: 'Total de la orden',
  })
  @IsNumber()
  @IsNotEmpty()
  total: number;
}
