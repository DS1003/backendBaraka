// Endpoint pour récupérer l'utilisateur connecté
export async function me(req, res, next) {
  try {
    const user = await userRepository.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}
// Contrôleur Auth (Signup/Login)

import SignupUseCase from '../../application/auth/SignupUseCase.js';
import LoginUseCase from '../../application/auth/LoginUseCase.js';
import PrismaUserRepository from '../../infrastructure/db/PrismaUserRepository.js';

const userRepository = new PrismaUserRepository();
const signupUseCase = new SignupUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

export async function signup(req, res, next) {
  try {
    const user = await signupUseCase.execute(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { user, token } = await loginUseCase.execute(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
}
