// Routes Commande (CRUD)
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { createOrder, getOrder, updateOrder, deleteOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/', createOrder);
// Liste des commandes (ex: GET /api/orders?limit=5)
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
