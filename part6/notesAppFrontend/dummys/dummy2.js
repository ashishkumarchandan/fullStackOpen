// src/services/login.js
import axios from 'axios'
const baseUrl = '/api/login' // or 'http://localhost:3001/api/login' if no proxy

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
