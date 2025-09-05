import { test, beforeEach, describe,after } from "node:test";
import assert from "assert";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { usersInDb } from "./test_helper_user.js";
import mongoose from "mongoose";

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(result.body.error.includes("expected `username` to be unique"));

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if username too short", async () => {
    const newUser = {
      username: "as",
      name: "Shorty",
      password: "mypassword",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(
      result.body.error.includes("Username must be at least 3 characters long")
    );
  });

  test("creation fails if password too short", async () => {
    const newUser = {
      username: "validuser",
      name: "Tester",
      password: "pw",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    assert(
      result.body.error.includes("password must be at least 3 characters long")
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
