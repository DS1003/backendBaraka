// Use case de synchronisation des commandes WooCommerce
import WooCommerceService from '../../infrastructure/woo/WooCommerceService.js';

export default class SyncOrdersUseCase {
  constructor(orderRepository, wooConfig) {
    this.orderRepository = orderRepository;
    this.wooService = new WooCommerceService(wooConfig);
  }

  // Pull : importer les commandes WooCommerce dans la base locale
  async pullOrders() {
    const wooOrders = await this.wooService.fetchOrders();
    const created = [];
    for (const w of wooOrders) {
      // Ici, on peut faire un upsert selon wooId
      const existing = await this.orderRepository.findByWooId(w.id.toString());
      if (!existing) {
        await this.orderRepository.create({
          id: w.id.toString(),
          wooId: w.id.toString(),
          status: w.status,
          total: parseFloat(w.total),
          userId: w.customer_id?.toString() || null,
          createdAt: new Date(w.date_created),
        });
        created.push(w.id);
      }
    }
    return created;
  }

  // Push : envoyer une commande locale vers WooCommerce
  async pushOrder(order) {
    const wooOrder = await this.wooService.pushOrder(order);
    return wooOrder;
  }
}
