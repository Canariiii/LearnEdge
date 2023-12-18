const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.createConnection('mongodb://127.0.0.1:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('UserController', () => {
  it('Error', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'Jose',
        email: 'test@prueba.es',
        password: '1234',
        phone: '1234',
        role: 'none'
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
  })
});