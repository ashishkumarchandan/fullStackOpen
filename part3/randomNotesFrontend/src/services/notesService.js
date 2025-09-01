import axios from "axios";
const baseUrl = "/api/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newNote) => {
  const response = await axios.post(baseUrl, newNote);
  return response.data;
};

const update = async (id, updatedNote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedNote);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
