const request = require('supertest');
const app = require('../server');

describe('GET /api/finance/test', () => {
  test('Should response the GET request', async () => {
    const response = await request(app).get('/api/finance/test');
    expect(response.statusCode).toBe(200);

    // for passing test
    expect(response.body).toEqual({ message: 'Test finance-server' });
    // for failing test
    // expect(response.body).toEqual({ message: 'Test FAIL' });
  });
});