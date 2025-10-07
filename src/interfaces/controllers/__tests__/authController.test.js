// Tests Jest pour signup/login
import request from 'supertest';
import app from '../../../app.js';

describe('AuthController', () => {
  const user = {
    email: 'testuser@example.com',
    password: 'TestPassword123!',
    name: 'Test User'
  };

  it('signup: crée un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send(user);
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', user.email);
  });

  it('login: retourne un token JWT', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: user.email, password: user.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', user.email);
  });

  // Pour OAuth, le test complet nécessite un mock ou un flow e2e (voir doc Passport)
});
