import request from "supertest";
import app from "./app.js";

describe("Multiple Test Cases og GET /greet", () => {
  test.each([
    ["", "Hello, World!"],
    ["Ashish", "Hello, Ashish!"],
    ["Bob", "Hello, Bob!"],
  ])("should return greeting for name: %s", async (name, expectedMessage) => {
    const response = await request(app)
      .get(name ? `/greet?name=${name}` : `/greet`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.message).toBe(expectedMessage);
  });
});
