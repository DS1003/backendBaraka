// dashboardRoutes.js
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getDashboardStats } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', authenticateJWT, getDashboardStats);

export default router;
