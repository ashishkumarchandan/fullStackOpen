import mongoose from "mongoose";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = config.MONGODB_URI;

const connectDB = async () => {
  if (!MONGODB_URI) {
    console.log("❌ MONGODB_URI missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
