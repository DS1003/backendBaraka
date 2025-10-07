// Service d'authentification Google OAuth2
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import PrismaUserRepository from '../db/PrismaUserRepository.js';
import { v4 as uuidv4 } from 'uuid';

const userRepository = new PrismaUserRepository();

export function setupGoogleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userRepository.findByEmail(profile.emails[0].value);
          if (!user) {
            user = await userRepository.create({
              id: uuidv4(),
              email: profile.emails[0].value,
              name: profile.displayName,
              provider: 'google',
              profileImage: profile.photos?.[0]?.value || null,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userRepository.findById(id);
    done(null, user);
  });
}
