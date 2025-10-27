import { IsString, IsNotEmpty, MinLength} from 'class-validator';




export class CreateCategoryDto {
    
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;
}


    
