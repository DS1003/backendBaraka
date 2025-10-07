// Interface ProductRepository (contrat pour l'implémentation technique)
class IProductRepository {
  async findById(id) { throw new Error('Not implemented'); }
  async findBySKU(sku) { throw new Error('Not implemented'); }
  async create(product) { throw new Error('Not implemented'); }
  async update(product) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async listByUser(userId) { throw new Error('Not implemented'); }
  async listAll() { throw new Error('Not implemented'); }
}

export default IProductRepository;
