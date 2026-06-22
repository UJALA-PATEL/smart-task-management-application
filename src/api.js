import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-task-management-application-10.onrender.com/api",   // 👈 LOCAL FIRST (testing ke liye)
  headers: {
    "Content-Type": "application/json",
  },
});

// token automatically attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;