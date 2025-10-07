// Routes Auth (Signup/Login)

import express from 'express';
import { signup, login, me } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Nouveau endpoint pour récupérer l'utilisateur connecté
router.get('/me', authenticateJWT, me);

export default router;
