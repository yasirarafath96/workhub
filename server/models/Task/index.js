import mongoose from "mongoose";
import { TASK_STATUS } from "../types/task/index.js";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: TASK_STATUS,
      default: "pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

// dueDate: Date,
// priority: { type: String, enum: ["low", "medium", "high"], default: "medium" }