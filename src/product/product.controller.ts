
import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
}
