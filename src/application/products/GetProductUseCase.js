// Use case lecture produit (par id)
export default class GetProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    return await this.productRepository.findById(id);
  }
}
