import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { OrderlineService } from './orderline.service';
import { OrderLine } from './orderline.entity';
import { CreateOrderLineDto } from './orderline.dto';

@Controller('orderline')
export class OrderlineController {
    constructor(private readonly orderLineService: OrderlineService) {}

    @Get()
    async getOrderLines(): Promise<OrderLine[]> {
        console.log('GET /orderline requested');
        const result = await this.orderLineService.getOrderLines();
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error('Failed to retrieve order lines');
        }
    }

    @Get(':id')
    async getOrderLineById(@Param('id') id: string): Promise<OrderLine | null> {
        try {
            return this.orderLineService.getOrderLineById(Number(id));
        } catch (error) {
            throw new Error('Failed to retrieve order line by ID');
        }
    }

    @Post()
    createOrderLine(@Body() createOrderLineDto: CreateOrderLineDto) {
        return this.orderLineService.createOrderLine(createOrderLineDto);
    }

    @Put(':id')
    updateOrderLine(@Param('id') id: string, @Body() updateOrderLineDto: CreateOrderLineDto) {
        return this.orderLineService.updateOrderLine(Number(id), updateOrderLineDto);
    }

    @Delete(':id')
    async deleteOrderLine(@Param('id') id: string): Promise<void> {
        return this.orderLineService.deleteOrderLine(Number(id));
    }
}
