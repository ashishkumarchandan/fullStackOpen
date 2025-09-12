import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/blogs`;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const resp = await axios.post(baseUrl, newBlog, config);
  return resp.data;
};

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, setToken, update, remove };
