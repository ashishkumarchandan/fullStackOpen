import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

export const getAuthToken = async () => {
  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "password123" });

  return loginResponse.body.token;
};
