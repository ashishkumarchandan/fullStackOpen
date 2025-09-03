// utils/middleware.js
import logger from "./logger.js";

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
  }

  next(err);
};

export default { requestLogger, unknownEndpoint, errorHandler };
