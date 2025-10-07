// Route pour notifications in-app
import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getUserNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', authenticateJWT, getUserNotifications);

export default router;
