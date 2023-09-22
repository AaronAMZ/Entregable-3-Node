const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const actor = {
        firstName: "Christopher",
        lastName: "Pratt",
        nationality: "American",
        image: "https://cdn.britannica.com/48/216648-050-4A42C937/American-actor-Chris-Pratt-2020.jpg",
        birthday: "1979-06-21"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actorUpdated = {
        firstName: "Chris updated"
    }
    const res = await request(app).put(`/actors/${id}`).send(actorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});