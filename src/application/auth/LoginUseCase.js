// Use case de connexion utilisateur (Login)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class LoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw new Error('Utilisateur ou mot de passe invalide');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Utilisateur ou mot de passe invalide');
    }
    // Générer le JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return { user, token };
  }
}
