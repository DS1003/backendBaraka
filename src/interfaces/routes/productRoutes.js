// Routes Produit (CRUD + import Excel)
import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct, importProductsExcel } from '../controllers/productController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.use(authenticateJWT); // Sécuriser toutes les routes

router.post('/', upload.single('image'), createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/import-excel', upload.single('file'), importProductsExcel);

export default router;
