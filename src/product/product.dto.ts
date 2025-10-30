import { IsString, IsNotEmpty, IsEmail, IsEnum, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateProductDto {
  @ApiProperty({
    example: 'Silla de Madera',
    description: 'Nombre del producto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Silla de madera maciza con acabado natural',
    description: 'Descripción detallada del producto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Marrón',
    description: 'Color principal del producto',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    example: 'Madera',
    description: 'Material principal del producto',
  })
  @IsString()
  @IsNotEmpty()
  material: string;

  @ApiProperty({
    example: 149.99,
    description: 'Precio del producto',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: '80x60x40 cm',
    description: 'Dimensiones del producto (opcional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  dimensions?: string;

  @ApiProperty({
    example: ['c6a5fbc8-2c64-4e47-9b25-1e9e9f43b2ef'],
    description: 'IDs de categorías asociadas al producto (opcional)',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  categoryIds?: string[];
}
