// Service de notification in-app (Toastify côté front) + mail
import MailService from '../../infrastructure/mail/MailService.js';

export default class NotificationService {
  constructor() {
    this.mailService = new MailService();
  }

  // Notification in-app (à envoyer au front via websocket ou API)
  async notifyInApp(userId, message, type = 'info') {
    // Ici, tu peux stocker la notif en base ou la pousser via websocket
    // Pour Toastify, le front doit consommer une API ou websocket
    // Exemple : return { userId, message, type, date: new Date() }
    return { userId, message, type, date: new Date() };
  }

  // Notification par mail
  async notifyByEmail(email, subject, html) {
    return this.mailService.sendMail({ to: email, subject, html });
  }
}
