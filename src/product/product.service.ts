import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Product} from './product.entity'
import { In, Repository } from 'typeorm';
import { Category } from '../category/category.entity'; 

@Injectable()
export class ProductService {
    categoryIds?: string[];
 constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    ) {}
    getProducts(): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['categories'],
        });
    }   
    async getProductById(id: string): Promise<Product | null> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['categories'],
        });
        return product;
    }

    async createProduct(createProductDto: CreateProductDto) {
         const { categoryIds, ...productData } = createProductDto;
        // const productData = createProductDto;
        const product = this.productRepository.create({
            ...productData,
        });

        if (categoryIds?.length) {
           const categories = await this.categoryRepository.find({
                where: { id: In(categoryIds) },
            });
            product.categories = categories;
        }
        await this.productRepository.save(product);
        return product;

    }

    async updateProduct(id: string, updateProductDto: CreateProductDto) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['categories'],
        });

        if (!product) {
            throw new Error('Product not found');
        }

        const { categoryIds, ...productData } = updateProductDto;

        Object.assign(product, productData);

        if (categoryIds?.length) {
            const categories = await this.categoryRepository.find({
                where: { id: In(categoryIds) },
            });
            product.categories = categories;
        }

        await this.productRepository.save(product);
        return product;
    }

    async deleteProduct(id: string): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Product not found');
        }
    }
  
}
