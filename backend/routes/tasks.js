import express from "express";
import Task from "../models/task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({ title: req.body.title, userId: req.userId });
    await task.save();
    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    res.json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
