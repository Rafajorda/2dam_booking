import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {

 constructor(

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    ) {}


    getCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }


    async createCategory(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create({
            ...createCategoryDto,
        });
        await this.categoryRepository.save(category);
        return category;
    }
}
