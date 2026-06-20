const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/Task");
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET TASKS (FIXED)
router.get("/", auth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const tasks = await Task.find({
      $or: [
        { createdBy: userId },
        { assignedTo: userId }
      ]
    })
      .populate("createdBy assignedTo", "email username")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, assignedEmail, priority } = req.body;

    let assignedUser = null;

    if (assignedEmail) {
      assignedUser = await User.findOne({ email: assignedEmail });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority, // optional
      createdBy: req.user.id,
      assignedTo: assignedUser ? assignedUser._id : null,
    });

    await task.save();

    const populated = await Task.findById(task._id)
      .populate("createdBy assignedTo", "email username");

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Not found" });

    if (req.body.status) task.status = req.body.status;
    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.dueDate) task.dueDate = req.body.dueDate;

    await task.save();

    const updated = await Task.findById(task._id)
      .populate("createdBy assignedTo", "email username");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;