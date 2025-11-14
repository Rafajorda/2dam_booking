import { Body, Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
   constructor(private readonly categoryService: CategoryService) {}


    @Get() 
       @ApiOperation({ summary: 'Obtener todas las categorías' })
       async getCategories(): Promise<Category[]> {
        console.log('GET /category requested');
        return this.categoryService.getCategories();
      }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener categoría por ID' })
    async getCategoryById(@Param('id', ParseUUIDPipe) id: string): Promise<Category | null> {
        return this.categoryService.getCategoryById(id);
    }

     @Post()
      @ApiOperation({ summary: 'Crear nueva categoría' })
      createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        console.log('BODY RECEIVED:', createCategoryDto);
        return this.categoryService.createCategory(createCategoryDto);
      }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar categoría' })
    updateCategory(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: CreateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar categoría' })
    async deleteCategory(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.categoryService.deleteCategory(id);
    }
    
}
