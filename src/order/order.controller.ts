import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async getOrders(): Promise<Order[]> {
        console.log('GET /order requested');
        const result = await this.orderService.getOrders();
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('Failed to retrieve orders');
        }
    }

    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<Order | null> {
        try {
            return this.orderService.getOrderById(Number(id));
        } catch (error) {
            throw new Error('Failed to retrieve order by ID');
        }
    }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Put(':id')
    updateOrder(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
        return this.orderService.updateOrder(Number(id), updateOrderDto);
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: string): Promise<void> {
        return this.orderService.deleteOrder(Number(id));
    }
}
