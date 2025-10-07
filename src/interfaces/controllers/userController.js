// Récupérer le profil utilisateur connecté
export async function getProfile(req, res, next) {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// Mettre à jour les infos du profil (hors image)
export async function updateProfile(req, res, next) {
  try {
    const { name, phone } = req.body;
    const user = await userRepository.update({
      id: req.user.id,
      name,
      phone,
      updatedAt: new Date(),
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// Supprimer son compte
export async function deleteUser(req, res, next) {
  try {
    await userRepository.delete(req.user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

// (Admin) Lister tous les utilisateurs
export async function getAllUsers(req, res, next) {
  try {
    // Optionnel : vérifier le rôle admin
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Accès refusé' });
    const users = await userRepository.listAll();
    res.json({ users });
  } catch (err) {
    next(err);
  }
}
// Contrôleur pour la mise à jour de la photo de profil utilisateur
import PrismaUserRepository from '../../infrastructure/db/PrismaUserRepository.js';
import CloudinaryService from '../../infrastructure/cloudinary/CloudinaryService.js';

const userRepository = new PrismaUserRepository();
const cloudinaryService = new CloudinaryService();

export async function updateProfileImage(req, res, next) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Aucun fichier image fourni' });
    }
    const imageUrl = await cloudinaryService.uploadImage(req.file.path);
    const user = await userRepository.update({
      id: req.user.id,
      profileImage: imageUrl,
      updatedAt: new Date(),
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
