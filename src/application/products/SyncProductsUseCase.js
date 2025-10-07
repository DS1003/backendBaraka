// Use case de synchronisation des produits WooCommerce
import WooCommerceProductService from '../../infrastructure/woo/WooCommerceProductService.js';

// Mapping local <-> WooCommerce
function toWooProduct(local) {
  return {
    name: local.name,
    description: local.description,
    regular_price: local.price?.toString(),
    stock_quantity: local.stock,
    sku: local.sku,
    categories: local.category ? [{ name: local.category }] : [],
    images: local.imageUrl ? [{ src: local.imageUrl }] : [],
    // Ajoute d'autres mappings si besoin
  };
}

function fromWooProduct(woo) {
  return {
    name: woo.name,
    description: woo.description,
    price: parseFloat(woo.regular_price),
    stock: woo.stock_quantity,
    sku: woo.sku,
    category: woo.categories?.[0]?.name || null,
    imageUrl: woo.images?.[0]?.src || null,
    wooId: woo.id.toString(),
    createdAt: new Date(woo.date_created),
    updatedAt: new Date(woo.date_modified),
  };
}

export default class SyncProductsUseCase {
  constructor(productRepository, wooConfig) {
    this.productRepository = productRepository;
    this.wooService = new WooCommerceProductService(wooConfig);
  }

  // Pull : importer les produits WooCommerce dans la base locale
  async pullProducts() {
    const wooProducts = await this.wooService.fetchProducts();
    const created = [];
    for (const w of wooProducts) {
      const local = fromWooProduct(w);
      const existing = await this.productRepository.findBySKU(local.sku);
      if (!existing) {
        await this.productRepository.create(local);
        created.push(local.sku);
      }
    }
    return created;
  }

  // Push : envoyer un produit local vers WooCommerce
  async pushProduct(product) {
    const wooProduct = await this.wooService.pushProduct(toWooProduct(product));
    return wooProduct;
  }
}
