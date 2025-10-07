// Routes Google OAuth2
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();
 
// Démarre l'auth Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Générer le JWT pour l'utilisateur Google
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, name: req.user.name, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    // Redirige vers le frontend avec le token
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${token}`)
  }
);

export default router;
