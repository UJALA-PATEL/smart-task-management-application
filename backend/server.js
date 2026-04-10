const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// ✅ DIRECT MONGODB CONNECTION (NO ENV)
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});