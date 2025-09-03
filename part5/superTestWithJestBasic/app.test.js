import request from "supertest";
import app from "./app.js";

describe("GET /greet endpoint", () => {
  it("should return a greeting message with the default name", async () => {
    const response = await request(app).get("/greet");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello, World!");
  });

  it("should return a greeting message with a provided name", async () => {
    const res = await request(app)
      .get("/greet")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toEqual({
      message: "Hello, World!",
    });
  });

  it("should return personalized greeting when name is given", async () => {
    const res = await request(app).get("/greet?name=Ashish").expect(200);

    expect(res.body.message).toBe("Hello, Ashish!");
  });

  it("should return a greeting message with another provided name", async () => {
    const response = await request(app).get("/greet?name=Bob");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello, Bob!");
  });
});
