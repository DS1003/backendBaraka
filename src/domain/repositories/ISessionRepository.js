// Interface SessionRepository (contrat pour l'implémentation technique)
class ISessionRepository {
  async findById(id) { throw new Error('Not implemented'); }
  async create(session) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async listByUser(userId) { throw new Error('Not implemented'); }
}

export default ISessionRepository;
