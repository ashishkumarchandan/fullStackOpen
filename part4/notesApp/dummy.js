app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});


app.put('/api/notes/:id', async (req, res, next) => {
  try {
    const { content, important } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const updated = await Note.findByIdAndUpdate(
      req.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' }
    );
    if (!updated) return res.status(404).json({ error: 'Note not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});


app.post('/api/notes', async (req, res, next) => {
  try {
    const { content, important } = req.body;
    const note = new Note({ content, important });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});