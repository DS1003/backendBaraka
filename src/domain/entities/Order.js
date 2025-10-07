// Entité Order (métier, sans dépendance technique)
class Order {
  constructor({
    id,
    wooId,
    status,
    total,
    syncedAt = null,
    userId,
    createdAt = new Date(),
  }) {
    this.id = id;
    this.wooId = wooId;
    this.status = status;
    this.total = total;
    this.syncedAt = syncedAt;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}

export default Order;
