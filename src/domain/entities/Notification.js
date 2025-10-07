// Entité Notification (historique des alertes)
class Notification {
  constructor({
    id,
    type,
    message,
    sentAt = new Date(),
    userId,
  }) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.sentAt = sentAt;
    this.userId = userId;
  }
}

export default Notification;
