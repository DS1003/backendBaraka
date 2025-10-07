// Entité Product (métier, sans dépendance technique)
class Product {
  constructor({
    id,
    name,
    description = null,
    price,
    stock,
    stockAlert = 5,
    sku = null,
    category = null,
    imageUrl = null,
    syncedWithWoo = false,
    notificationSent = false,
    userId,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.stockAlert = stockAlert;
    this.sku = sku;
    this.category = category;
    this.imageUrl = imageUrl;
    this.syncedWithWoo = syncedWithWoo;
    this.notificationSent = notificationSent;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Product;
