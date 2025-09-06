import express from "express";
import connectDB from "./mongo.js";
import logger from "./utils/logger.js";
import middleware from "./utils/middleware.js";
import notesRouter from "./controllers/notes.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

const app = express();

connectDB().catch((error) => {
  logger.error("❌ failed to connect to MongoDB, exiting.", error.message);
  process.exit(1);
});

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
