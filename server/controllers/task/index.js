import Task from '../../models/Task/index.js';

export const createTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      createdBy: userId,
      assignedTo: assignedTo || null,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    // const tasks = await Task.find({ createdBy: userId }).populate("assignedTo", "username email");

    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    }).populate("assignedTo", "username email");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task", error: err.message });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!deletedTask) return res.status(404).json({ message: "Task not found or unauthorized" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
};

export const getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user tasks', error: err.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.userId;

    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      { status },
      { new: true }
    ).populate("assignedTo", "username email");

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
};