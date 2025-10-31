const request = require('supertest');
const app = require('../app');

let token;

describe('Testes API REST', () => {

  test('GET /produtos sem token deve retornar 401', async () => {
    const response = await request(app).get('/produtos');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', '123456789');
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe('Token inválido');
  });

  test('POST /usuarios/login deve retornar token', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ email: 'email@exemplo.com', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test('GET /produtos com token válido deve retornar 200', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

  test('POST /usuarios/renovar retorna novo token', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test('GET /produtos com novo token retorna 200', async () => {
    const response = await request(app)
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
  });

});
