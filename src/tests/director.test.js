const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const director = {
        firstName: "James",
        lastName: "Gunn",
        nationality: "American",
        image: "https://www.themoviedb.org/t/p/w500/2kFzvqCGeYBrgbuuvvyGE75d9gM.jpg",
        birthday: "1966-08-05"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('PUT /directors/:id debe actualizar un director', async () => {
    const directorUpdated = {
        firstName: "James updated"
    }
    const res = await request(app).put(`/directors/${id}`).send(directorUpdated);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});