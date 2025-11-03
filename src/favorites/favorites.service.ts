import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorites } from './favorites.entity';
import { CreateFavoriteDto } from './favorites.dto';
import { User } from '../users/user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(Favorites)
        private favoritesRepository: Repository<Favorites>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    getFavorites(): Promise<Favorites[]> {
        return this.favoritesRepository.find({
            relations: ['user', 'product'],
        });
    }

    async getFavoriteById(id: number): Promise<Favorites | null> {
        const favorite = await this.favoritesRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });
        return favorite;
    }

    async createFavorite(createFavoriteDto: CreateFavoriteDto) {
        const user = await this.userRepository.findOne({
            where: { id: createFavoriteDto.userId },
        });

        const product = await this.productRepository.findOne({
            where: { id: createFavoriteDto.productId },
        });

        if (!user || !product) {
            throw new Error('User or Product not found');
        }

        const favorite = this.favoritesRepository.create({
            user,
            product,
        });

        await this.favoritesRepository.save(favorite);
        return favorite;
    }

    async updateFavorite(id: number, updateFavoriteDto: CreateFavoriteDto) {
        const favorite = await this.favoritesRepository.findOne({
            where: { id },
        });

        if (!favorite) {
            throw new Error('Favorite not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: updateFavoriteDto.userId },
        });

        const product = await this.productRepository.findOne({
            where: { id: updateFavoriteDto.productId },
        });

        if (!user || !product) {
            throw new Error('User or Product not found');
        }

        favorite.user = user;
        favorite.product = product;

        await this.favoritesRepository.save(favorite);
        return favorite;
    }

    async deleteFavorite(id: number): Promise<void> {
        const result = await this.favoritesRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Favorite not found');
        }
    }
}
