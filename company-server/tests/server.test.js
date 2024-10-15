const request = require('supertest');
const app = require('../server');

describe('GET /api/company/test', () => {
  test('Should response the GET request', async () => {
    const response = await request(app).get('/api/company/test');
    expect(response.statusCode).toBe(200);

    // for passing test
    expect(response.body).toEqual({ message: 'Test company-server' });
    // for failing test
    // expect(response.body).toEqual({ message: 'Test FAIL' });
  });
});