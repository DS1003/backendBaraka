// Use case d'inscription utilisateur (Signup)
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export default class SignupUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password, name, profileImage = null, phone = null }) {
    // Vérifier si l'utilisateur existe déjà
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email déjà utilisé');
    }
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Création de l'utilisateur
    const user = await this.userRepository.create({
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      profileImage,
      phone,
      provider: 'local',
      role: 'USER',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }
}
