const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let id = null;
let token = null;

describe('Testes do recurso /usuarios', () => {


    test('POST /usuarios deve retornar 201, JSON, _id e email', async () => {
        const response = await request.post('/usuarios').send({
            email: 'teste@example.com',
            senha: '123456'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('email', 'teste@example.com');

        id = response.body._id; 
    });


    test('POST /usuarios sem JSON deve retornar 422 + msg', async () => {
        const response = await request.post('/usuarios').send({});
        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('msg');
    });

    test('POST /usuarios/login deve retornar 200 + token', async () => {
        const response = await request.post('/usuarios/login').send({
            email: 'teste@example.com',
            senha: '123456'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');

        token = response.body.token;  
    });

    test('POST /usuarios/login sem JSON deve retornar 401 + msg', async () => {
        const response = await request.post('/usuarios/login').send({});
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg');
    });

    test('POST /usuarios/renovar com token deve retornar 200 + novo token', async () => {
        const response = await request
            .post('/usuarios/renovar')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /usuarios/renovar com token inválido deve retornar 401', async () => {
        const response = await request
            .post('/usuarios/renovar')
            .set('Authorization', 'Bearer 123456789')
            .send();
        expect(response.status).toBe(401);
    });

    test('DELETE /usuarios/:id deve retornar 204', async () => {
        const response = await request
            .delete(`/usuarios/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(204);
    });

});
