// Routes Commande (CRUD)
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/', createOrder);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
