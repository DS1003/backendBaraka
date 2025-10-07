// Use case suppression commande
export default class DeleteOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    await this.orderRepository.delete(id);
    return true;
  }
}
