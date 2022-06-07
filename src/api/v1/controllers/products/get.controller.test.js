const supertest = require('supertest');
const { app } = require('../../../../app');
const { server } = require('../../../../app');

const api = supertest(app);

describe('[PRODUCTS][GET] /items/:id', () => {
    
    test('It should respond with a 200 status code when passing some Mercado Libre Id', async () => {
        const itemId = 'MLA916256682';
        const { body } = await api.get(`/api/v1/items/${itemId}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);   
    }); 

    test('It should respond with a 400 status code when passing wrong Mercado Libre Id', async () => {
        const itemId = 'MLAFake';
        const { body } = await api.get(`/api/v1/items/${itemId}`)
        .expect(404)
        .expect('Content-Type', /application\/json/);   
    }); 
    
});

afterAll(() => {
    server.close();
});
