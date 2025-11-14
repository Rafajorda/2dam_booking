import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

    // ==================== ADMIN: CRUD COMPLETO ====================
    getFavorites(): Promise<Favorites[]> {
        return this.favoritesRepository.find({
            relations: ['user', 'product', 'product.images'],
        });
    }

    async getFavoriteById(id: number): Promise<Favorites | null> {
        const favorite = await this.favoritesRepository.findOne({
            where: { id },
            relations: ['user', 'product', 'product.images'],
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
            throw new NotFoundException('Usuario o Producto no encontrado');
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
            throw new NotFoundException('Favorito no encontrado');
        }

        const user = await this.userRepository.findOne({
            where: { id: updateFavoriteDto.userId },
        });

        const product = await this.productRepository.findOne({
            where: { id: updateFavoriteDto.productId },
        });

        if (!user || !product) {
            throw new NotFoundException('Usuario o Producto no encontrado');
        }

        favorite.user = user;
        favorite.product = product;

        await this.favoritesRepository.save(favorite);
        return favorite;
    }

    async deleteFavorite(id: number): Promise<void> {
        const result = await this.favoritesRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Favorito no encontrado');
        }
    }

    // ==================== USER: FAVORITOS PROPIOS ====================
    async getMyFavorites(userId: number) {
        const favorites = await this.favoritesRepository.find({
            where: { user: { id: userId } },
            relations: ['product', 'product.images'],
        });

        return favorites;
    }

    async addToFavorites(userId: number, productId: string) {
        // Verificar que el producto existe
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        // Verificar si ya está en favoritos
        const existingFavorite = await this.favoritesRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });

        if (existingFavorite) {
            throw new ConflictException('El producto ya está en favoritos');
        }

        // Añadir a favoritos
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        
        const newFavorite = this.favoritesRepository.create({
            user,
            product,
        });

        await this.favoritesRepository.save(newFavorite);
        return newFavorite;
    }

    async removeFromFavorites(userId: number, productId: string) {
        const favorite = await this.favoritesRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });

        if (!favorite) {
            throw new NotFoundException('Producto no encontrado en favoritos');
        }

        await this.favoritesRepository.remove(favorite);
        return { message: 'Producto eliminado de favoritos' };
    }
}
