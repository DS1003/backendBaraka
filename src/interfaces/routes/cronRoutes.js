// Route manuelle pour déclencher les alertes (pour test, à remplacer par cron réel)
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import StockAlertService from '../../domain/services/StockAlertService.js';

const router = express.Router();
const stockAlertService = new StockAlertService();

router.post('/stock-alerts', authenticateJWT, async (req, res, next) => {
  try {
    const alerts = await stockAlertService.checkAndNotifyAllUsers();
    res.json({ alerts });
  } catch (err) {
    next(err);
  }
});

export default router;
