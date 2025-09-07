// import { test, beforeEach, after } from "node:test";
// import assert from "assert";
// import supertest from "supertest";
// import mongoose from "mongoose";
// import app from "../app.js";
// import User from "../models/user.model.js";

// const api = supertest(app);
// beforeEach(async () => {
//   await User.deleteMany({});
//   const user = new User({ username: "root", passwordHash: "hashedpass" });
//   await user.save();
// });

// test("invalid user is not created (short username)", async () => {
//   const newUser = {
//     username: "ab",
//     name: "Invalid User",
//     password: "secret123",
//   };

//   const result = await api.post("/api/users").send(newUser).expect(400);

//   assert(result.body.error.includes("must be at least 3 characters long"));
// });

// test("invalid user is not created (duplicate username)", async () => {
//   const newUser = {
//     username: "root",
//     name: "Duplicate",
//     password: "secret123",
//   };

//   const result = await api.post("/api/users").send(newUser).expect(400);

//   assert(result.body.error.includes("username must be unique"));
// });

// after(async () => {
//   await mongoose.connection.close();
// });
