// utils/middleware.js
import jwt from "jsonwebtoken";
import logger from "./logger.js";
import User from "../models/user.models.js";

const requestLogger = (req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, req.body || "");
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      req.token = authorization.substring(7);
    } else {
      req.token = null;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const userExtractor = async (req, res, next) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.SECRET);

      if (decodedToken.id) {
        req.user = await User.findById(decodedToken.id);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
