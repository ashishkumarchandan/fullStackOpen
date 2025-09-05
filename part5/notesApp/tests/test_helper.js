import notesModels from "../models/notes.models.js";
import User from "../models/user.models.js";

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
  const notes = await notesModels.find({}).populate("user", { username: 1, name: 1 });
  return notes.map((note) => {
    return note.toJSON();
  });
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export default {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
