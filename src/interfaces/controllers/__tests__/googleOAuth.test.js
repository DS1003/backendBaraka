// Test d'intégration Google OAuth (mock)
import passport from 'passport';
import request from 'supertest';
import app from '../../../app.js';

describe('Google OAuth2', () => {
  it('devrait rediriger vers Google pour /auth/google', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.status).toBe(302); // Redirection
    expect(res.headers.location).toContain('accounts.google.com');
  });

  // Le callback nécessite un vrai flow OAuth2, difficile à automatiser sans mock complet
  // Pour un vrai test e2e, utiliser un outil comme Cypress ou Playwright avec un compte Google test
});
