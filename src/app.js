import dashboardFiltersRoutes from './interfaces/routes/dashboardFiltersRoutes.js';
import dashboardRoutes from './interfaces/routes/dashboardRoutes.js';
import wooProductRoutes from './interfaces/routes/wooProductRoutes.js';
import wooRoutes from './interfaces/routes/wooRoutes.js';
import orderRoutes from './interfaces/routes/orderRoutes.js';
import cronRoutes from './interfaces/routes/cronRoutes.js';
import notificationRoutes from './interfaces/routes/notificationRoutes.js';
import userRoutes from './interfaces/routes/userRoutes.js';
import { authenticateJWT } from './interfaces/middlewares/authMiddleware.js';
// Initialisation d'Express et middlewares globaux
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './interfaces/routes/authRoutes.js';
import googleOAuthRoutes from './interfaces/routes/googleOAuthRoutes.js';
import productRoutes from './interfaces/routes/productRoutes.js';
import errorHandler from './interfaces/middlewares/errorHandler.js';
import excelRoutes from './interfaces/routes/excelRoutes.js';
import passport from 'passport';
import { setupGoogleStrategy } from './infrastructure/auth/GoogleOAuthService.js';


const app = express();
setupGoogleStrategy();
app.use(passport.initialize());

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));




// Routes principales
app.use('/auth', authRoutes);
app.use('/api/auth', googleOAuthRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/woocommerce', wooRoutes);
app.use('/woocommerce', wooProductRoutes);
app.use('/orders', orderRoutes);
app.use('/notifications', notificationRoutes);
app.use('/cron', cronRoutes);
app.use('/excel', excelRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dashboard/filters', dashboardFiltersRoutes);

// Sécurisation globale des routes sensibles (à activer quand les routes existent)
// app.use('/orders', authenticateJWT, orderRoutes);
// app.use('/woocommerce', authenticateJWT, wooRoutes);
// app.use('/notifications', authenticateJWT, notificationRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;
