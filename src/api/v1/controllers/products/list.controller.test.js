const supertest = require('supertest');
const { app } = require('../../../../app');
const { server } = require('../../../../app');

const api = supertest(app);

describe('[LIST][GET] /items?search=[query]', () => {
    
    test('It should respond with a 200 status code when passing query params Mercado Libre Id', async () => {
        const search = 'celular';
        const { body } = await api.get(`/api/v1/items?search=${search}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);   
    }); 

    test('It should inside the body bring an items array with four elements', async () => {
        const search = 'celular';
        const { body } = await api.get(`/api/v1/items?search=${search}`); 
        expect(body.items.length).toEqual(4);
    }); 
    
});

afterAll(() => {
    server.close();
});
