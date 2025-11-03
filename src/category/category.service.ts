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

    async getCategoryById(id: string): Promise<Category | null> {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        return category;
    }

    async createCategory(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create({
            ...createCategoryDto,
        });
        await this.categoryRepository.save(category);
        return category;
    }

    async updateCategory(id: string, updateCategoryDto: CreateCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });

        if (!category) {
            throw new Error('Category not found');
        }

        Object.assign(category, updateCategoryDto);
        await this.categoryRepository.save(category);
        return category;
    }

    async deleteCategory(id: string): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Category not found');
        }
    }
}
