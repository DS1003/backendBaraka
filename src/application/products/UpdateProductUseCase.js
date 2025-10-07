// Use case mise à jour produit
export default class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    productData.updatedAt = new Date();
    return await this.productRepository.update(productData);
  }
}
