import express from "express";
import connectDB from "./utils/mongo.js";
import blogRouter from "./controller/blogRouter.js";
import middleware from "./utils/middleware.js";
import userRouter from "./controller/userRouter.js";
import loginRouter from "./controller/loginRouter.js";

const app = express();

connectDB().catch((err) => {
  console.log("❌ failed to connect to MongoDB, exiting.", err.message);
  process.exit(1);
});

app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandeler);

export default app;
