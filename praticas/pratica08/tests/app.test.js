const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/usuarios/login')
    .send({ email: 'email@exemplo.com', senha: 'abcd1234' });

  if (!res.body.token) throw new Error('Token não retornado no login');

  token = res.body.token;
});
describe('Testes da API REST', () => {

  test('GET /produtos sem token deve retornar 401 Não autorizado', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401 Token inválido', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe('Token inválido');
  });

  test('GET /produtos com token válido deve retornar 200', async () => {
    const res = await request(app)
      .get('/produtos')
      .set('authorization', token);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /usuarios/renovar deve retornar novo token', async () => {
    const res = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

    token = res.body.token; 
  });

});
