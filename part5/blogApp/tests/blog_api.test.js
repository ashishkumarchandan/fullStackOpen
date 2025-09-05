import { after, beforeEach, test, describe } from "node:test";
import assert from "assert";
import app from "../app.js";
import Blog from "../models/blog.models.js";
import supertest from "supertest";
import mongoose, { mongo } from "mongoose";

const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "Alice",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Bob",
    url: "http://example.com/2",
    likes: 7,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("when there are some blogs saved", () => {
  test("blogs are returned as json and correct amount", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = response.body;

    for (const blog of blogs) {
      assert.ok(blog.id, "blog.id should be defined");
      assert.strictEqual(
        blog._id,
        undefined,
        "blog._id should not be returned"
      );
      assert.strictEqual(
        blog.__v,
        undefined,
        "blog.__v should not be returned"
      );
    }

    assert.strictEqual(response.body.length, initialBlogs.length);
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Async/Await makes life easier",
    author: "Charlie",
    url: "http://example.com/async",
    likes: 10,
  };

  // Send POST request
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201) // Created
    .expect("Content-Type", /application\/json/);

  // Check all blogs after insertion
  const response = await api.get("/api/blogs");
  const blogsAtEnd = response.body;

  // Blog count should increase by 1
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

  // Titles should contain the new blog’s title
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("Async/Await makes life easier"));
});
describe("adding a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Async/Await makes life easier",
      author: "Charlie",
      url: "http://example.com/async",
      likes: 10,
    };

    // POST request
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201) // 201 Created
      .expect("Content-Type", /application\/json/);

    // Verify blogs after insertion
    const response = await api.get("/api/blogs");
    const blogsAtEnd = response.body;

    // Count check
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

    // Content check
    const titles = blogsAtEnd.map((b) => b.title);
    assert.ok(titles.includes("Async/Await makes life easier"));
  });
});

describe("when adding a new blog", () => {
  test("if likes property is missing, it defaults to 0", async () => {
    const newBlog = {
      title: "Blog with no likes field",
      author: "Dana",
      url: "http://example.com/nolikes",
      // likes missing
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    // Check that likes defaulted to 0
    assert.strictEqual(response.body.likes, 0);
  });
});

describe("when adding a new blog", () => {
  test("blog without title is not added", async () => {
    const newBlog = {
      author: "Eve",
      url: "http://example.com/notitle",
      likes: 3,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test("blog without url is not added", async () => {
    const newBlog = {
      title: "Missing URL",
      author: "Eve",
      likes: 3,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
  });
});

describe('deletion of a blog', () => { 
    test("succeeds with status code 204 if id is valid", async()=>{
        const resBlogStart = await api.
    })
 })

after(async () => {
  await mongoose.connection.close();
});
