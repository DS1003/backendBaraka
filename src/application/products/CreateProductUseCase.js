// Use case création produit
import { v4 as uuidv4 } from 'uuid';

export default class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({ name, description, price, stock, stockAlert = 5, sku = null, category = null, imageUrl = null, userId }) {
    const product = await this.productRepository.create({
      id: uuidv4(),
      name,
      description,
      price,
      stock,
      stockAlert,
      sku,
      category,
      imageUrl,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return product;
  }
}
