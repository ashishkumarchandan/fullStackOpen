import { test, after, beforeEach } from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import notesModels from "../models/notes.models.js";

const api = supertest(app);

const initialNotes = [
  { content: "HTML is easy", important: false },
  { content: "Browser can execute only JavaScript", important: true },
];

beforeEach(async () => {
  await notesModels.deleteMany({});
  await notesModels.insertMany(initialNotes);
});

test("notes are returned as json", async () => {
  await api.get("/api/notes").expect(200).expect("Content-Type", /json/);
});

after(async () => {
  await mongoose.connection.close();
});
