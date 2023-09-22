const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;

test('GET /movies debe traer todas las películas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una película', async () => {
    const movie = {
        name: "Guardianes de la Galaxia",
        image: "https://es.web.img3.acsta.net/c_310_420/pictures/14/06/17/14/04/353959.jpg",
        synopsis: "Un aventurero espacial se convierte en la presa de unos cazadores de tesoros después de robar el orbe de un villano traicionero. Cuando descubre su poder, debe hallar la forma de unir a unos rivales para salvar al universo",
        releaseYear: "2014",
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});

test('PUT /movies/:id debe actualizar una película', async () => {
    const movieUpdated = {
        name: "Guardianes de la Galaxia updated"
    }
    const res = await request(app).put(`/movies/${id}`).send(movieUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/actors debe insertar los actores de una película', async () => {
    const actor = await Actor.create({
        firstName: "Christopher",
        lastName: "Pratt",
        nationality: "American",
        image: "https://cdn.britannica.com/48/216648-050-4A42C937/American-actor-Chris-Pratt-2020.jpg",
        birthday: "1979-06-21"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar los directores de una película', async () => {
    const director = await Director.create({
        firstName: "James",
        lastName: "Gunn",
        nationality: "American",
        image: "https://www.themoviedb.org/t/p/w500/2kFzvqCGeYBrgbuuvvyGE75d9gM.jpg",
        birthday: "1966-08-05"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres debe insertar los géneros de una película', async () => {
    const genre = await Genre.create({ name: "Ciencia Ficción" })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe eliminar una película', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});