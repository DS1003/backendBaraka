// Use case création commande
import { v4 as uuidv4 } from 'uuid';

export default class CreateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ wooId, status, total, userId }) {
    const order = await this.orderRepository.create({
      id: uuidv4(),
      wooId,
      status,
      total,
      userId,
      createdAt: new Date(),
    });
    return order;
  }
}
