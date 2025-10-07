// Use case lecture commande (par id)
export default class GetOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    return await this.orderRepository.findById(id);
  }
}
