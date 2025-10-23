import { IsString, IsNotEmpty, IsEmail, IsEnum, IsNumber, IsOptional, IsArray, IsUUID } from 'class-validator';



export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  color: string;
  @IsString()
  @IsNotEmpty()
  material: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  dimensions?: string;
  
//    @IsArray()
//   @IsUUID('all', { each: true })
//   @IsOptional()
//   categoryIds?: string[];
}


    
