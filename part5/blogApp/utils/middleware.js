import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const unknownEndpoints = (req, res) => {
  res.status(400).send({
    error: "Unknown Server error",
  });
};

const errorHandeler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  }

  next(err);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: "token missing" });
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  unknownEndpoints,
  errorHandeler,
  tokenExtractor,
  userExtractor,
};
