// Entité Session (multi-device, audit, sécurité)
class Session {
  constructor({
    id,
    userId,
    createdAt = new Date(),
    expiresAt,
    userAgent = null,
    ip = null,
  }) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.expiresAt = expiresAt;
    this.userAgent = userAgent;
    this.ip = ip;
  }
}

export default Session;
