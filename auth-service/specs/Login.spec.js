// File: specs/Authentication/Login.spec.js

const request = require('supertest');
const app = require('../../auth-service/src/index'); // adjust path if needed

describe('Auth Service - Login API', () => {

  it('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/auth_service/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('should fail to login with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth_service/auth/login')
      .send({
        email: 'wronguser@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid email or password');
  });

});
