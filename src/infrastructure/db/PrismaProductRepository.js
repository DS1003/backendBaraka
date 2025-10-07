// Implémentation technique du ProductRepository avec Prisma
import { PrismaClient } from '@prisma/client';
import IProductRepository from '../../domain/repositories/IProductRepository.js';
import Product from '../../domain/entities/Product.js';

class PrismaProductRepository extends IProductRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? new Product(product) : null;
  }

  async findBySKU(sku) {
    const product = await this.prisma.product.findUnique({ where: { sku } });
    return product ? new Product(product) : null;
  }

  async create(productData) {
    const product = await this.prisma.product.create({ data: productData });
    return new Product(product);
  }

  async update(productData) {
    const product = await this.prisma.product.update({ where: { id: productData.id }, data: productData });
    return new Product(product);
  }

  async delete(id) {
    await this.prisma.product.delete({ where: { id } });
  }

  async listByUser(userId) {
    const products = await this.prisma.product.findMany({ where: { userId } });
    return products.map(p => new Product(p));
  }

  async listAll() {
    const products = await this.prisma.product.findMany();
    return products.map(p => new Product(p));
  }
}

export default PrismaProductRepository;
