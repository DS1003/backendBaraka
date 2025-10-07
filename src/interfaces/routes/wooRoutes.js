// Routes WooCommerce (sync commandes)
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { pullWooOrders, pushOrderToWoo } from '../controllers/wooController.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/orders/pull', pullWooOrders);
router.post('/orders/push', pushOrderToWoo);

export default router;
