const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  completed: { type: Boolean, default: false },
  priority: { type: String, default: "Low" }, // Low/Medium/High
  dueDate: { type: Date, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  tags: [{ type: String }],
  points: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);