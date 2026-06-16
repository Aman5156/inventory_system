import axios from 'axios';

// Default dev backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

