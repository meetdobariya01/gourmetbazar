// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ match your Express backend URL
  withCredentials: true, // only needed if using cookies or sessions
});

export default api;
