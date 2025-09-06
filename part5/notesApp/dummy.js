notesRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const note = new Note({
      content: req.body.content,
      important: req.body.important || false,
      user: req.user._id,
    });

    const savedNote = await note.save();
    req.user.notes = req.user.notes.concat(savedNote._id);
    await req.user.save();

    res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});
