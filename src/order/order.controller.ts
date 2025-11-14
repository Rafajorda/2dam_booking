import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async getOrders(): Promise<Order[]> {
        console.log('GET /order requested');
        return this.orderService.getOrders();
    }

    @Get(':id')
    async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order | null> {
        return this.orderService.getOrderById(id);
    }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Put(':id')
    updateOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: CreateOrderDto) {
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @Delete(':id')
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.orderService.deleteOrder(id);
    }
}
