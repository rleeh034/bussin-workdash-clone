const request = require('supertest');
const app = require('../server');

describe('GET /api/user/test', () => {
  test('Should response the GET request', async () => {
    const response = await request(app).get('/api/user/test');
    expect(response.statusCode).toBe(200);

    // for passing test
    expect(response.body).toEqual({ message: 'Test account-server' });
    // for failing test
    // expect(response.body).toEqual({ message: 'Test FAIL' });
  });
});