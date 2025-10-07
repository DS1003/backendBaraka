// Use case mise à jour commande
export default class UpdateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    return await this.orderRepository.update(orderData);
  }
}
