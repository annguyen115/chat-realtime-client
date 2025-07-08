import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = async (username: string) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username });
  return res.data; // { access_token, user }
};

export const fetchHistory = async () => {
  const res = await axios.get(`${API_URL}/chat/history`);
  return res.data; // array of messages
};