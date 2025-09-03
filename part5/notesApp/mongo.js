import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

dotenv.config();

const MONGODB_URI = config.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    logger.error("❌ MONGODB_URI missing in .env");
    process.exit(1);
  }

  try {
    logger.info("connecting to", config.MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    logger.info("connected to MongoDB");
  } catch (err) {
    logger.error("error connecting to MongoDB:", err.message);
    // rethrow so app startup can handle if needed
    throw err;
  }
};

export default connectDB;
