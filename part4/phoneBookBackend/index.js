import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import Person from "./model/person.js";
import connectDB from "./mongo.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>Notes API is running</h1>");
});

morgan.token("body", (req) => {
  JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  try {
    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({ error: "Name and number are required" });
    }

    const person = new Person({ name, number });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  try {
    const { number } = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      {
        number,
      },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (updatedPerson) {
      res.json(updatedPerson);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Unknown Endpoint",
  });
});

app.use((err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Malformed ID",
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
