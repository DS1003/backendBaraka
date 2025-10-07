// Implémentation technique du OrderRepository avec Prisma
import { PrismaClient } from '@prisma/client';
import IOrderRepository from '../../domain/repositories/IOrderRepository.js';
import Order from '../../domain/entities/Order.js';

class PrismaOrderRepository extends IOrderRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    return order ? new Order(order) : null;
  }

  async findByWooId(wooId) {
    const order = await this.prisma.order.findUnique({ where: { wooId } });
    return order ? new Order(order) : null;
  }

  async create(orderData) {
    const order = await this.prisma.order.create({ data: orderData });
    return new Order(order);
  }

  async update(orderData) {
    const order = await this.prisma.order.update({ where: { id: orderData.id }, data: orderData });
    return new Order(order);
  }

  async delete(id) {
    await this.prisma.order.delete({ where: { id } });
  }

  async listByUser(userId) {
    const orders = await this.prisma.order.findMany({ where: { userId } });
    return orders.map(o => new Order(o));
  }

  async listAll() {
    const orders = await this.prisma.order.findMany();
    return orders.map(o => new Order(o));
  }
}

export default PrismaOrderRepository;
