// Interface OrderRepository (contrat pour l'implémentation technique)
class IOrderRepository {
  async findById(id) { throw new Error('Not implemented'); }
  async findByWooId(wooId) { throw new Error('Not implemented'); }
  async create(order) { throw new Error('Not implemented'); }
  async update(order) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async listByUser(userId) { throw new Error('Not implemented'); }
  async listAll() { throw new Error('Not implemented'); }
}

export default IOrderRepository;
