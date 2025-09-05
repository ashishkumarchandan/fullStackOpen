import express from "express";
import connectDB from "./mongo.js";
import blogRouter from "./controller/blogRouter.js";
import middleware from "./utils/middleware.js";

const app = express();

connectDB().catch((err) => {
  console.log("❌ failed to connect to MongoDB, exiting.", err.message);
  process.exit(1);
});

app.use(express.json());

app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandeler);

app.use("/api/blogs", blogRouter);

export default app;
