import axios from "axios";

// ⚠️ IMPORTANT:
// LOCALHOST (dev)
// const BASE_URL = "http://localhost:5000/api";

// DEPLOYMENT (Render/Vercel ke baad isko change karna hoga)
const BASE_URL = "http://localhost:5000/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto token attach
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;