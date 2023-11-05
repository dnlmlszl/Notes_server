require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/Notes');

beforeAll(async () => {
  // Kapcsolódás az adatbázishoz
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 100000);

beforeEach(async () => {
  await Note.deleteMany({}); // Törli az összes jegyzetet az adatbázisból
  await Note.insertMany(helper.initialNotes);

  // console.log('cleared');

  // helper.initialNotes.forEach(async (note) => {
  //   let noteObject = new Note(note);
  //   await noteObject.save();
  //   console.log('saved');
  // });
  // console.log('done');

  // let noteObject = new Note(helper.initialNotes[0]);
  // await noteObject.save();

  // noteObject = new Note(helper.initialNotes[1]);
  // await noteObject.save();

  // Hozzáadja az inicializált jegyzeteket az adatbázishoz
  const noteObjects = helper.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);
}, 100000);

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/v1/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/v1/notes');

    expect(response.body.notes).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/v1/notes');

    const contents = response.body.notes.map((r) => r.content);

    expect(contents).toContain('Browser can execute only JavaScript');
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/v1/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultNote.body.notes).toEqual(noteToView);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/v1/notes/${validNonexistingId}`).expect(404);
  });

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a344s5';

    await api.get(`/api/v1/notes/${invalidId}`).expect(400);
  });
});

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/v1/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain('async/await simplifies making async calls');
  });

  test('fails with status code 400 if data invalid', async () => {
    const newNote = {
      important: true,
    };

    await api.post('/api/v1/notes').send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/v1/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});
/*
test('all notes are returned', async () => {
  const response = await api.get('/api/v1/notes');

  expect(response.body.notes).toHaveLength(helper.initialNotes.length);
}, 100000);

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/v1/notes');

  const contents = response.body.notes.map((r) => r.content);
  expect(contents).toContain('Browser can execute only JavaScript');
}, 100000);

test('notes are returned as json', async () => {
  await api
    .get('/api/v1/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there are two notes', async () => {
  const response = await api.get('/api/v1/notes');

  expect(response.body.notes).toHaveLength(2);
}, 100000);

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/v1/notes');
  const contents = response.body.notes.map((note) => note.content);

  expect(contents).toContain('HTML is easy');
}, 100000);

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/v1/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  // const response = await api.get('/api/v1/notes');

  // const contents = response.body.notes.map((r) => r.content);

  // expect(response.body.notes).toHaveLength(initialNotes.length + 1);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);

  expect(contents).toContain('async/await simplifies making async calls');
}, 100000);

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/v1/notes').send(newNote).expect(400);

  // const response = await api.get('/api/v1/notes');

  // expect(response.body.notes).toHaveLength(initialNotes.length);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
}, 100000);

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/v1/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/v1/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

  const contents = notesAtEnd.map((r) => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});
*/
afterAll(async () => {
  await mongoose.connection.close();
});
