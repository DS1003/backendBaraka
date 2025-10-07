// Service d'automatisation des alertes stock critique (mail + notification in-app)
import PrismaProductRepository from '../../infrastructure/db/PrismaProductRepository.js';
import PrismaNotificationRepository from '../../infrastructure/db/PrismaNotificationRepository.js';
import MailService from '../../infrastructure/mail/MailService.js';

export default class StockAlertService {
  constructor() {
    this.productRepository = new PrismaProductRepository();
    this.notificationRepository = new PrismaNotificationRepository();
    this.mailService = new MailService();
  }

  async checkAndNotifyAllUsers() {
    // Pour chaque utilisateur, vérifier les produits en stock critique
    const products = await this.productRepository.listAll();
    const alerts = [];
    for (const product of products) {
      if (product.stock <= product.stockAlert && !product.notificationSent) {
        // Notif in-app
        await this.notificationRepository.create({
          id: crypto.randomUUID(),
          type: 'stock',
          message: `Stock critique pour ${product.name} (stock: ${product.stock})`,
          userId: product.userId,
        });
        // Notif mail
        await this.mailService.sendMail({
          to: product.user?.email,
          subject: 'Alerte stock critique',
          html: `<p>Le produit <b>${product.name}</b> est en stock critique (${product.stock}).</p>`,
        });
        // Marquer comme notifié
        await this.productRepository.update({ ...product, notificationSent: true });
        alerts.push(product);
      }
    }
    return alerts;
  }
}
