import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { CreateCartDto } from './cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    async getCarts(): Promise<Cart[]> {
        console.log('GET /cart requested');
        const result = await this.cartService.getCarts();
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('Failed to retrieve carts');
        }
    }

    @Get(':id')
    async getCartById(@Param('id') id: string): Promise<Cart | null> {
        try {
            return this.cartService.getCartById(Number(id));
        } catch (error) {
            throw new Error('Failed to retrieve cart by ID');
        }
    }

    @Post()
    createCart(@Body() createCartDto: CreateCartDto) {
        return this.cartService.createCart(createCartDto);
    }

    @Put(':id')
    updateCart(@Param('id') id: string, @Body() updateCartDto: CreateCartDto) {
        return this.cartService.updateCart(Number(id), updateCartDto);
    }

    @Delete(':id')
    async deleteCart(@Param('id') id: string): Promise<void> {
        return this.cartService.deleteCart(Number(id));
    }
}
