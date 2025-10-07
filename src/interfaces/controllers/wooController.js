// Contrôleur pour synchronisation commandes WooCommerce
import PrismaOrderRepository from '../../infrastructure/db/PrismaOrderRepository.js';
import SyncOrdersUseCase from '../../application/orders/SyncOrdersUseCase.js';

// À adapter pour récupérer la config WooCommerce de l'utilisateur connecté
function getWooConfigFromUser(user) {
  return {
    storeUrl: user.wooConfig?.storeUrl,
    apiKey: user.wooConfig?.apiKey,
    apiSecret: user.wooConfig?.apiSecret,
  };
}

export async function pullWooOrders(req, res, next) {
  try {
    const wooConfig = getWooConfigFromUser(req.user);
    const useCase = new SyncOrdersUseCase(new PrismaOrderRepository(), wooConfig);
    const created = await useCase.pullOrders();
    res.json({ created });
  } catch (err) {
    next(err);
  }
}

export async function pushOrderToWoo(req, res, next) {
  try {
    const wooConfig = getWooConfigFromUser(req.user);
    const useCase = new SyncOrdersUseCase(new PrismaOrderRepository(), wooConfig);
    const wooOrder = await useCase.pushOrder(req.body);
    res.json({ wooOrder });
  } catch (err) {
    next(err);
  }
}
