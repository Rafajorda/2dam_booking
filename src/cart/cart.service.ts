import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartDto } from './cart.dto';
import { Product } from '../product/product.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    getCarts(): Promise<Cart[]> {
        return this.cartRepository.find({
            relations: ['user', 'products'],
        });
    }

    async getCartById(id: number): Promise<Cart | null> {
        const cart = await this.cartRepository.findOne({
            where: { id },
            relations: ['user', 'products'],
        });
        return cart;
    }

    async createCart(createCartDto: CreateCartDto) {
        const { productIds, ...cartData } = createCartDto;
        const cart = this.cartRepository.create({
            ...cartData,
        });

        if (productIds?.length) {
            const products = await this.productRepository.find({
                where: { id: In(productIds) },
            });
            cart.products = products;
        }

        await this.cartRepository.save(cart);
        return cart;
    }

    async updateCart(id: number, updateCartDto: CreateCartDto) {
        const cart = await this.cartRepository.findOne({
            where: { id },
            relations: ['products'],
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const { productIds, ...cartData } = updateCartDto;
        Object.assign(cart, cartData);

        if (productIds?.length) {
            const products = await this.productRepository.find({
                where: { id: In(productIds) },
            });
            cart.products = products;
        }

        await this.cartRepository.save(cart);
        return cart;
    }

    async deleteCart(id: number): Promise<void> {
        const result = await this.cartRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Cart not found');
        }
    }
}
