import notesModels from "../models/notes.models.js";

const initialNotes = [
  { content: "HTML is easy", important: false },
  { content: "Browser can execute only JavaScript", important: true },
];

const nonExistingId = async () => {
  const note = new notesModels({
    content: "willremovethissoon",
  });

  await note.save();
  await note.deleteOne();
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await notesModels.find({});
  return notes.map((note) => {
    return note.toJSON();
  });
};

export default {
  initialNotes,
  nonExistingId,
  notesInDb,
};
