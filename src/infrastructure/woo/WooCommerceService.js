// Service WooCommerce pour synchronisation commandes (pull/push)
import axios from 'axios';

export default class WooCommerceService {
  constructor({ storeUrl, apiKey, apiSecret }) {
    this.api = axios.create({
      baseURL: `${storeUrl}/wp-json/wc/v3`,
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });
  }

  // Récupérer les commandes WooCommerce
  async fetchOrders(params = {}) {
    const { data } = await this.api.get('/orders', { params });
    return data;
  }

  // Créer/mettre à jour une commande WooCommerce
  async pushOrder(order) {
    if (order.wooId) {
      // Update
      const { data } = await this.api.put(`/orders/${order.wooId}`, order);
      return data;
    } else {
      // Create
      const { data } = await this.api.post('/orders', order);
      return data;
    }
  }
}
