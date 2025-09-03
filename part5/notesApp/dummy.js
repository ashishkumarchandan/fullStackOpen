import assert from "node:assert";
import { test, beforeEach, after, describe } from "node:test";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import Note from "../models/note.js";
import * as helper from "./test_helper.js";

const api = supertest(app);

describe("when there are initially some notes", () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies async code",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);
    const contents = notesAtEnd.map((n) => n.content);
    assert(contents.includes("async/await simplifies async code"));
  });

  test("note without content is not added", async () => {
    const newNote = { important: true };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
