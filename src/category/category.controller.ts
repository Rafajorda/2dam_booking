import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
   constructor(private readonly categoryService: CategoryService) {}


    @Get() 
       async getCategories(): Promise<Category[]> {
        console.log('GET /category requested');
        const result = await this.categoryService.getCategories();
        if (Array.isArray(result)) {
          return result;
        } else {
          throw new Error('Failed to retrieve categories    ');
        }
      }
     @Post()
      createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        console.log('BODY RECEIVED:', createCategoryDto);
        return this.categoryService.createCategory(createCategoryDto);
      }
    
}
