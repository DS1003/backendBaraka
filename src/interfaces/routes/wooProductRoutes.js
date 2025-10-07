// Routes WooCommerce (sync produits)
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { pullWooProducts, pushProductToWoo } from '../controllers/wooProductController.js';

const router = express.Router();

router.use(authenticateJWT);

router.post('/products/pull', pullWooProducts);
router.post('/products/push', pushProductToWoo);

export default router;
