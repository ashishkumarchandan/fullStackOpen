import express from "express";
import notesModels from "../models/notes.models.js";
const notesRouter = express.Router();
import logger from "../utils/logger.js";

notesRouter.get("/", async (req, res, next) => {
  try {
    const notes = await notesModels.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

notesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "malformatted id" });
    }

    const note = await notesModels.findById(req.params.id);

    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (req, res, next) => {
  try {
    const { content, important = false } = req.body;

    const note = new notesModels({
      content,
      important,
    });

    const saved = await note.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "malformatted id" });
    }

    const deletedNote = await notesModels.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (req, res, next) => {
  try {
    const { content, important } = req.body;
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "malformatted id" });
    }

    if (!content) {
      logger.error("Content missing for PUT /api/notes/:id");
      return res.status(400).json({ error: "Content is required" });
    }

    const updated = await notesModels.findByIdAndUpdate(
      id,
      { content, important },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updated) {
      logger.error(`Note with id ${req.params.id} not found`);
      return res.status(404).json({ error: "Note not found" });
    }

    logger.info(`Note ${req.params.id} updated successfully`);
    res.json(updated);
  } catch (error) {
    logger.error("Error in PUT /api/notes/:id", error.message);
    next(error);
  }
});

export default notesRouter;
