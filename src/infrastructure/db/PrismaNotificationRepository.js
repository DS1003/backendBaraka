// Implémentation technique du NotificationRepository avec Prisma
import { PrismaClient } from '@prisma/client';
import INotificationRepository from '../../domain/repositories/INotificationRepository.js';
import Notification from '../../domain/entities/Notification.js';

class PrismaNotificationRepository extends INotificationRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    return notification ? new Notification(notification) : null;
  }

  async create(notificationData) {
    const notification = await this.prisma.notification.create({ data: notificationData });
    return new Notification(notification);
  }

  async listByUser(userId) {
    const notifications = await this.prisma.notification.findMany({ where: { userId } });
    return notifications.map(n => new Notification(n));
  }

  async listAll() {
    const notifications = await this.prisma.notification.findMany();
    return notifications.map(n => new Notification(n));
  }
}

export default PrismaNotificationRepository;
