import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import Note from "./models/note.js"; // Note: ensure your model file is a .js module
import connectDB from "./mongo.js"; // Note: ensure your db connection file is a .js module

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("<h1>Notes API is running</h1>");
});

app.get("/api/notes", async (_req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

app.get("/api/notes/:id", async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).end();
    res.json(note);
  } catch (error) {
    // Changed 'err' to 'error' for consistency
    next(error);
  }
});

app.post("/api/notes", async (req, res, next) => {
  console.log("REQ BODY:", req.body);
  try {
    const { content, important } = req.body;
    const note = new Note({
      content,
      important,
    });

    const saved = await note.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

app.put("/api/notes/:id", async (req, res, next) => {
  try {
    const { content, important } = req.body;
    if (!content) {
      return res.status(400).json({
        error: "Content is required", // Corrected typo
      });
    }

    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      {
        content,
        important,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/notes/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end(); // Corrected with ()
  } catch (error) {
    // Changed 'err' to 'error'
    next(error);
  }
});

// Unknown endpoint
app.use((_req, res) => {
  res.status(404).json({
    error: "Unknown endpoint",
  });
});

// Error handler middleware
app.use((err, _req, res, _next) => {
  console.error("🔥 Error:", err.message);
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Malformed ID" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
