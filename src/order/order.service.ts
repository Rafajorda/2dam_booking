import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}

    getOrders(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['orderLines'],
        });
    }

    async getOrdersByUser(userId: number): Promise<Order[]> {
        return this.orderRepository.find({
            where: { user: { id: userId } },
            relations: ['orderLines', 'orderLines.product', 'orderLines.product.images'],
            order: { createdAt: 'DESC' },
        });
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderLines', 'orderLines.product', 'user'],
        });

        if (!order) {
            throw new NotFoundException(`Pedido con ID "${id}" no encontrado`);
        }

        return order;
    }

    async getOrderByIdForUser(id: number, userId: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['orderLines', 'orderLines.product', 'orderLines.product.images'],
        });

        if (!order) {
            throw new NotFoundException(`Pedido con ID "${id}" no encontrado o no te pertenece`);
        }

        return order;
    }

    async createOrder(createOrderDto: CreateOrderDto) {
        const order = this.orderRepository.create({
            ...createOrderDto,
        });
        await this.orderRepository.save(order);
        return order;
    }

    async updateOrder(id: number, updateOrderDto: CreateOrderDto) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });

        if (!order) {
            throw new NotFoundException(`Pedido con ID "${id}" no encontrado`);
        }

        Object.assign(order, updateOrderDto);
        await this.orderRepository.save(order);
        return order;
    }

    async deleteOrder(id: number): Promise<void> {
        const result = await this.orderRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Pedido con ID "${id}" no encontrado`);
        }
    }
}
