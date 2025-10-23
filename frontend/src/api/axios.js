import axios from "axios";
const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const instance = axios.create({ baseURL: base });

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default instance;
