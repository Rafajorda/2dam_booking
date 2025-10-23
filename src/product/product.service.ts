import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Product} from './product.entity'
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity'; 

@Injectable()
export class ProductService {

 constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    // @InjectRepository(Category)
    // private categoryRepository: Repository<Category>,
    ) {}
    getProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createProduct(createProductDto: CreateProductDto) {
        //  const { categoryIds, ...productData } = createProductDto;
        const productData = createProductDto;
        const product = this.productRepository.create({
            ...productData,
        });

        // if (categoryIds?.length) {
        //     const categories = await this.categoryRepository.findByIds(categoryIds);
        //     product.categories = categories;
        // }
        await this.productRepository.save(product);
        return product;

    }
}
