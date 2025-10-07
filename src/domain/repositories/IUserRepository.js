// Interface UserRepository (contrat pour l'implémentation technique)
class IUserRepository {
  async findById(id) { throw new Error('Not implemented'); }
  async findByEmail(email) { throw new Error('Not implemented'); }
  async create(user) { throw new Error('Not implemented'); }
  async update(user) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async listAll() { throw new Error('Not implemented'); }
}

export default IUserRepository;
