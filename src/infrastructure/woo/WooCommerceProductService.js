// Service WooCommerce pour synchronisation produits (pull/push)
import axios from 'axios';

export default class WooCommerceProductService {
  constructor({ storeUrl, apiKey, apiSecret }) {
    this.api = axios.create({
      baseURL: `${storeUrl}/wp-json/wc/v3`,
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });
  }

  // Récupérer les produits WooCommerce
  async fetchProducts(params = {}) {
    const { data } = await this.api.get('/products', { params });
    return data;
  }

  // Créer/mettre à jour un produit WooCommerce
  async pushProduct(product) {
    if (product.wooId) {
      // Update
      const { data } = await this.api.put(`/products/${product.wooId}`, product);
      return data;
    } else {
      // Create
      const { data } = await this.api.post('/products', product);
      return data;
    }
  }
  // Récupérer dynamiquement les champs obligatoires WooCommerce (basé sur le schéma API)
  async fetchRequiredFields() {
    // WooCommerce ne fournit pas directement les champs obligatoires via l’API REST,
    // mais on peut utiliser /products endpoint pour obtenir le schéma d’un produit
    // et déduire les champs requis (exemple basique ci-dessous)
    const { data } = await this.api.options('/products');
    // data.schema.properties contient la définition des champs
    // On filtre ceux qui sont required
    const required = data.schema && data.schema.required ? data.schema.required : ['name', 'regular_price', 'sku'];
    return required;
  }
}
