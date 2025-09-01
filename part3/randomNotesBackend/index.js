import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import initialNotes from "./src/dummyData.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static files from React build folder
app.use(express.static(path.join(__dirname, "dist")));

// ✅ In-memory notes (like a mock DB)
let notes = [...initialNotes];

// ✅ API Routes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: "Note not found" });
  }
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const newNote = {
    ...body,
    important: body.important || false,
    id: String(notes.length + 1),
  };

  notes.push(newNote);
  res.json(newNote);
});

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  notes[index] = { ...notes[index], ...req.body };
  res.json(notes[index]);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});

// ✅ Fallback: Serve React index.html for all non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
