// dashboardRoutes.js
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getDashboardStats, getTopProducts } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', authenticateJWT, getDashboardStats);
router.get('/top-products', authenticateJWT, getTopProducts);

export default router;
