// Route pour exposer les colonnes d'un fichier Excel (mapping Sage/WooCommerce)
import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { getExcelColumns, importProductsWithMapping, saveCompletedProducts } from '../controllers/excelController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// Route pour importer des produits avec mapping personnalisé

// Route pour sauvegarder les produits enrichis/corrigés par l'utilisateur
router.post('/save', authenticateJWT, express.json(), saveCompletedProducts);

router.post('/columns', authenticateJWT, upload.single('file'), getExcelColumns);

export default router;
