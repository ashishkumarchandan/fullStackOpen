import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import initialNotes from "./src/dummyData.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let notes = [...initialNotes];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => {
    return note.id === id;
  });
  if (note) {
    res.json(note);
  } else {
    res.status(404).send(`<h1>nah its not there </h1>`);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const updatedNotes = notes.filter((note) => {
    return note.id !== id;
  });
  notes = updatedNotes;
  res.status(204).send("Deletion Completed");
});

app.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const noteIndex = notes.findIndex((note) => note.id === id); // Ensure type matches

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  const updatedNote = {
    ...notes[noteIndex],
    ...req.body,
    id,
  };

  notes[noteIndex] = updatedNote;

  res.json(updatedNote);
});

const generateId = () => {
  let maxId = 0;
  if (notes.length > 0) {
    maxId = Math.max(
      ...notes.map((n) => {
        return Number(n.id);
      })
    );
  }
  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    res.status(400).json({
      error: "content missing",
    });

    return;
  }

  const note = {
    ...body,
    important: body.important || false,
    id: generateId(),
  };

  notes.push(note);

  res.json(note);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
