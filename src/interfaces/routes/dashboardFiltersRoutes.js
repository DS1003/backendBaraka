// dashboardFiltersRoutes.js
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getProducts, exportProductsCSV, getOrders, exportOrdersCSV, getUsers, exportUsersCSV, getNotifications, exportNotificationsCSV, getLogs, exportLogsCSV } from '../controllers/dashboardFiltersController.js';

const router = express.Router();

// Produits paginés/filtrés
router.get('/products', authenticateJWT, getProducts);
// Export produits CSV
router.get('/products/export', authenticateJWT, exportProductsCSV);
// Commandes paginées/filtrées
router.get('/orders', authenticateJWT, getOrders);
// Export commandes CSV
router.get('/orders/export', authenticateJWT, exportOrdersCSV);
// Utilisateurs paginés/filtrés
router.get('/users', authenticateJWT, getUsers);
// Export utilisateurs CSV
router.get('/users/export', authenticateJWT, exportUsersCSV);
// Notifications paginées/filtrées
router.get('/notifications', authenticateJWT, getNotifications);
// Export notifications CSV
router.get('/notifications/export', authenticateJWT, exportNotificationsCSV);
// Logs paginés/filtrés
router.get('/logs', authenticateJWT, getLogs);
// Export logs CSV
router.get('/logs/export', authenticateJWT, exportLogsCSV);

export default router;
