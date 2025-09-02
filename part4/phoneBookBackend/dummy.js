app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

// ✅ Get person by ID
app.get('/api/persons/:id', async (req, res, next) => {
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

// ✅ Add new person
app.post('/api/persons', async (req, res, next) => {
  try {
    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({ error: 'Name and number are required' });
    }

    const person = new Person({ name, number });
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

// ✅ Update person
app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { number } = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true, context: 'query' }
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

// ✅ Delete person
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// ✅ Unknown endpoint handler
app.use((req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
});
