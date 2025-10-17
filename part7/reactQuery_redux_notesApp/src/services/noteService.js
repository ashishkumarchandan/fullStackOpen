import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getNotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNote = async (newNote) => {
  const response = await axios.post(baseUrl, newNote);
  return response.data;
};

const updateNote = async (updatedNote) => {
  const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);

  return response.data;
};

export default { getNotes, createNote, updateNote };
