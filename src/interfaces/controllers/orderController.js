// Contrôleur Commande (CRUD)
import PrismaOrderRepository from '../../infrastructure/db/PrismaOrderRepository.js';
import CreateOrderUseCase from '../../application/orders/CreateOrderUseCase.js';
import GetOrderUseCase from '../../application/orders/GetOrderUseCase.js';
import UpdateOrderUseCase from '../../application/orders/UpdateOrderUseCase.js';
import DeleteOrderUseCase from '../../application/orders/DeleteOrderUseCase.js';

const orderRepository = new PrismaOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getOrderUseCase = new GetOrderUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);

export async function createOrder(req, res, next) {
  try {
    const order = await createOrderUseCase.execute({ ...req.body, userId: req.user.id });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const order = await getOrderUseCase.execute(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(req, res, next) {
  try {
    const order = await updateOrderUseCase.execute({ ...req.body, id: req.params.id });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

export async function deleteOrder(req, res, next) {
  try {
    await deleteOrderUseCase.execute(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
