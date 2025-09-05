import { after, beforeEach, describe, test } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import notesModels from "../models/notes.models.js";
import helper from "./test_helper.js";
import User from "../models/user.models.js";

const api = supertest(app);

beforeEach(async () => {
  await notesModels.deleteMany({});
  await User.deleteMany({});

  const user = new User({ username: "root", password: "password" });
  await user.save();

  const noteObjects = helper.initialNotes.map((note) => new notesModels({ ...note, user: user._id }));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

describe("when there are initially some notes", () => {
  test("a valid note can be added", async () => {
    const users = await helper.usersInDb();
    const user = users[0];

    const newNote = {
      content: "async/await simplifies async code",
      important: true,
      userId: user.id,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => {
      return n.content;
    });

    assert(contents.includes("async/await simplifies async code"));
  });

  test("note without content is not added", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.get(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "12345invalidid";
    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1);
    const contents = notesAtEnd.map((r) => r.content);
    assert(!contents.includes(noteToDelete.content));
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api.delete(`/api/notes/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "notavalidid123";
    await api.delete(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("updating a note", () => {
  test("succeeds with valid data", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToUpdate = notesAtStart[0];

    const updatedData = {
      content: "Updated note content",
      important: !noteToUpdate.important,
    };

    const result = await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.content, updatedData.content);
    assert.strictEqual(result.body.important, updatedData.important);
  });

  test("fails with 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();
    const updatedData = { content: "Non existing", important: true };

    await api
      .put(`/api/notes/${validNonexistingId}`)
      .send(updatedData)
      .expect(404);
  });

  test("fails with 400 if id is invalid", async () => {
    const invalidId = "invalid123id";
    const updatedData = { content: "Does not matter", important: true };

    await api.put(`/api/notes/${invalidId}`).send(updatedData).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});