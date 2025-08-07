import mongoose from "mongoose";
import { PROJECT_STATUS, PROJECT_PRIORITY } from "../types/project/index.js";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  status: {
    type: String,
    enum: PROJECT_STATUS,
    default: "pending",
  },

  priority: {
    type: String,
    enum: PROJECT_PRIORITY,
    default: "medium",
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  isArchived: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("projects", projectSchema);
export default Project;