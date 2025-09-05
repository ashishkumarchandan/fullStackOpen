import { test, describe } from "node:test";
import assert from "assert";

import listHelper from "./lists_helper.js";
test("dummy runs one ", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    { title: "Blog 1", author: "A", url: "url1", likes: 3 },
  ];
  const listWithManyBlogs = [
    { title: "Blog 1", author: "A", url: "url1", likes: 3 },
    { title: "Blog 2", author: "B", url: "url2", likes: 7 },
    { title: "Blog 3", author: "C", url: "url3", likes: 2 },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 3);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 12); // 3+7+2
  });
});

describe("favorite blog", () => {
  const blogs = [
    { title: "Blog 1", author: "A", url: "url1", likes: 3 },
    { title: "Blog 2", author: "B", url: "url2", likes: 7 },
    { title: "Blog 3", author: "C", url: "url3", likes: 2 },
  ];

  test("of empty list is null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, equals that blog", () => {
    const singleBlog = [blogs[0]];
    const result = listHelper.favoriteBlog(singleBlog);
    assert.deepStrictEqual(result, blogs[0]);
  });

  test("of a bigger list is the one with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[1]); // Blog 2 has 7 likes
  });
});

describe("most blogs", () => {
  const blogs = [
    { title: "Blog 1", author: "Alice", likes: 5 },
    { title: "Blog 2", author: "Bob", likes: 2 },
    { title: "Blog 3", author: "Alice", likes: 7 },
    { title: "Blog 4", author: "Charlie", likes: 1 },
    { title: "Blog 5", author: "Alice", likes: 4 },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, equals that author with count 1", () => {
    const singleBlog = [blogs[1]];
    const result = listHelper.mostBlogs(singleBlog);
    assert.deepStrictEqual(result, { author: "Bob", blogs: 1 });
  });

  test("of a bigger list is the author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, { author: "Alice", blogs: 3 });
  });
});

describe("most likes", () => {
  const blogs = [
    { title: "Blog 1", author: "Alice", likes: 5 },
    { title: "Blog 2", author: "Bob", likes: 10 },
    { title: "Blog 3", author: "Alice", likes: 7 },
    { title: "Blog 4", author: "Charlie", likes: 3 },
    { title: "Blog 5", author: "Alice", likes: 4 },
  ];

  test("of empty list is null", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });

  test("when list has only one blog, equals that author with likes", () => {
    const singleBlog = [blogs[1]];
    const result = listHelper.mostLikes(singleBlog);
    assert.deepStrictEqual(result, { author: "Bob", likes: 10 });
  });

  test("of a bigger list is the author with most total likes", () => {
    const result = listHelper.mostLikes(blogs);
    // Alice: 5+7+4 = 16, Bob: 10, Charlie: 3
    assert.deepStrictEqual(result, { author: "Alice", likes: 16 });
  });
});
