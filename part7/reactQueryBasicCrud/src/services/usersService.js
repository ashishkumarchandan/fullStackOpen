import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const fetchUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

const addUser = async (user) => {
  const { data } = await axios.post(API_URL, user);
  return data;
};

const updateUser = async ({ id, ...user }) => {
  const { data } = await axios.put(`${API_URL}/${id}`, user);
  return data;
};

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export { fetchUsers, addUser, updateUser, deleteUser };
