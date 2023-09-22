const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres debe traer todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un género', async () => {
    const genre = { name: "Ciencia Ficción"}
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('PUT /genres/:id debe actualizar un género', async () => {
    const genreUpdated = {
        name: "Romance updated"
    }
    const res = await request(app).put(`/genres/${id}`).send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

test('DELETE /genres/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});