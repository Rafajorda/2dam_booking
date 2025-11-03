import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
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

    @Get(':id')
    async getCategoryById(@Param('id') id: string): Promise<Category | null> {
        try {
            return this.categoryService.getCategoryById(id);
        } catch (error) {
            throw new Error('Failed to retrieve category by ID');
        }
    }

     @Post()
      createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        console.log('BODY RECEIVED:', createCategoryDto);
        return this.categoryService.createCategory(createCategoryDto);
      }

    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() updateCategoryDto: CreateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }
    
}
