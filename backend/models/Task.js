const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },

  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo"
  },

  dueDate: { type: Date, default: null },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);