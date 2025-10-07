// Use case suppression produit
export default class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    await this.productRepository.delete(id);
    return true;
  }
}
