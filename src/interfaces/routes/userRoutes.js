// Route pour la mise à jour de la photo de profil utilisateur
import express from 'express';
import multer from 'multer';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { updateProfileImage, getProfile, updateProfile, deleteUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// Profil utilisateur connecté
router.get('/me', authenticateJWT, getProfile);
router.put('/me', authenticateJWT, updateProfile);
router.put('/profile-image', authenticateJWT, upload.single('image'), updateProfileImage);
router.delete('/me', authenticateJWT, deleteUser);

// (Admin) Lister tous les utilisateurs
router.get('/', authenticateJWT, getAllUsers);

export default router;
