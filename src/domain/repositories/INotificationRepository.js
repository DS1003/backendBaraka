// Interface NotificationRepository (contrat pour l'implémentation technique)
class INotificationRepository {
  async findById(id) { throw new Error('Not implemented'); }
  async create(notification) { throw new Error('Not implemented'); }
  async listByUser(userId) { throw new Error('Not implemented'); }
  async listAll() { throw new Error('Not implemented'); }
}

export default INotificationRepository;
