
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

 @Get() 
   async getProducts(): Promise<Product[]> {
    console.log('GET /product requested');
    const result = await this.productService.getProducts();
    if (Array.isArray(result)) {
      return result;
    } else {
      throw new Error('Failed to retrieve products');
    }
  }
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    try {
        return this.productService.getProductById(id);
    } catch (error) {
        throw new Error('Failed to retrieve product by ID');
    }
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
