const API =
  process.env.NODE_ENV === "production"
    ? "https://task-manager-backend-i6qm.onrender.com"
    : "http://localhost:5000";

export default API;
