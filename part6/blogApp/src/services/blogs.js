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

export default { getAll, create, setToken };
