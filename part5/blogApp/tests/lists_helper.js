// const dummy = (blogs) => {
//   return 1;
// };

// const totalLikes = (blogs) => {
//   return blogs.reduce((sum, curr) => {
//     return sum + curr.likes;
//   }, 0);
// };

// const favoriteBlog = (blogs) => {
//   if (blogs.length === 0) {
//     return null;
//   }

//   return blogs.reduce((favorite, blog) => {
//     return blog.likes > favorite.likes ? blog : favorite;
//   });
// };

// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) {
//     return null;
//   }

//   // Count blogs per author
//   const authorCount = {};
//   blogs.forEach((blog) => {
//     authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
//   });

//   // Find author with max blogs
//   let maxAuthor = null;
//   let maxBlogs = 0;

//   for (const author in authorCount) {
//     if (authorCount[author] > maxBlogs) {
//       maxBlogs = authorCount[author];
//       maxAuthor = author;
//     }
//   }

//   return {
//     author: maxAuthor,
//     blogs: maxBlogs,
//   };
// };

// const mostLikes = (blogs) => {
//   if (blogs.length === 0) {
//     return null;
//   }

//   const likeCount = {};
//   blogs.forEach((blog) => {
//     likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes;
//   });

//   let maxAuthor = null;
//   let maxLikes = 0;
//   for (const author in likeCount) {
//     if (likeCount[author] > maxLikes) {
//       maxLikes = likeCount[author];
//       maxAuthor = author;
//     }
//   }

//   return { author: maxAuthor, likes: maxLikes };
// };
// export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };


// import supertest from "supertest";
// import app from "../app.js";

// const api = supertest(app);

// export const getAuthToken = async () => {
//   const loginResponse = await api
//     .post("/api/login")
//     .send({ username: "testuser", password: "password123" });

//   return loginResponse.body.token;
// };
