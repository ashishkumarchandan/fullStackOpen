import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: "4",
    content: "cyberpunk",
    important: true,
  },
];

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
