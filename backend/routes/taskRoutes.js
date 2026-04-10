const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET all tasks (creator + assignee)
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    })
    .populate("createdBy assignedTo", "email username")
    .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE TASK (with assign by email)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, assignedEmail } = req.body;

    let assignedUser = null;

    if (assignedEmail) {
      assignedUser = await User.findOne({ email: assignedEmail });
      if (!assignedUser) {
        return res.status(404).json({ message: "Assigned user not found" });
      }
    }

    const task = new Task({
      title,
      description,
      status: "Todo",
      dueDate,
      createdBy: req.user.id,
      assignedTo: assignedUser ? assignedUser._id : null
    });

    const savedTask = await task.save();

    const populatedTask = await Task.findById(savedTask._id)
      .populate("createdBy assignedTo", "email username");

    res.json(populatedTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE TASK (role based)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const isCreator = task.createdBy.toString() === req.user.id;
    const isAssignee = task.assignedTo?.toString() === req.user.id;

    // ASSIGNEE → only status
    if (isAssignee && !isCreator) {
      task.status = req.body.status || task.status;
    }

    // CREATOR → everything except status
    if (isCreator) {
      if (req.body.title) task.title = req.body.title;
      if (req.body.description) task.description = req.body.description;
      if (req.body.dueDate) task.dueDate = req.body.dueDate;
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("createdBy assignedTo", "email username");

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE TASK (only creator)
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;