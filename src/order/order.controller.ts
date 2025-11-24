import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @UseGuards(AuthGuard, AdminGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener todas las órdenes (solo admin)' })
    async getOrders(): Promise<Order[]> {
        console.log('GET /order requested');
        return this.orderService.getOrders();
    }

    @Get(':id')
    @UseGuards(AuthGuard, AdminGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Obtener orden por ID (solo admin)' })
    async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order | null> {
        return this.orderService.getOrderById(id);
    }

    @Post()
    @UseGuards(AuthGuard, AdminGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Crear nueva orden (solo admin)' })
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard, AdminGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Actualizar orden (solo admin)' })
    updateOrder(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: CreateOrderDto) {
        return this.orderService.updateOrder(id, updateOrderDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, AdminGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Eliminar orden (solo admin)' })
    async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.orderService.deleteOrder(id);
    }
}
