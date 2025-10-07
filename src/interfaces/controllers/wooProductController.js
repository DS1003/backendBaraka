// Contrôleur pour synchronisation produits WooCommerce
import PrismaProductRepository from '../../infrastructure/db/PrismaProductRepository.js';
import SyncProductsUseCase from '../../application/products/SyncProductsUseCase.js';

function getWooConfigFromUser(user) {
  return {
    storeUrl: user.wooConfig?.storeUrl,
    apiKey: user.wooConfig?.apiKey,
    apiSecret: user.wooConfig?.apiSecret,
  };
}

export async function pullWooProducts(req, res, next) {
  try {
    const wooConfig = getWooConfigFromUser(req.user);
    const useCase = new SyncProductsUseCase(new PrismaProductRepository(), wooConfig);
    const created = await useCase.pullProducts();
    res.json({ created });
  } catch (err) {
    next(err);
  }
}

export async function pushProductToWoo(req, res, next) {
  try {
    const wooConfig = getWooConfigFromUser(req.user);
    const useCase = new SyncProductsUseCase(new PrismaProductRepository(), wooConfig);
    const wooProduct = await useCase.pushProduct(req.body);
    res.json({ wooProduct });
  } catch (err) {
    next(err);
  }
}
