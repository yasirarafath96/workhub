import express from "express";
import connectDB from "./connection/db.js";

import Profile from './models/Profile/index.js'
import User from "./models/User/index.js";
import Task from "./models/Task/index.js";
import Project from "./models/Project/index.js";

import { authenticateToken } from "./middleware/auth.js";
import { setupSwagger } from "./swagger.js";
import { login, signup } from "./controllers/auth/index.js";
import { createTask, deleteTaskById, getAllTasks, getTaskById, getTasksByUser, updateTaskStatus } from "./controllers/task/index.js";
import { createProject, deleteProjectById, getAllProjects, getProjectById, getProjectsByUser, updateProject } from "./controllers/project/index.js";
import { createUserProfile, deleteUserProfile, getUserProfile, updateUserProfile, uploadUserFile } from "./controllers/userProfile/index.js";

import multer from "multer";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from "helmet";
import { getAllUsers } from "./controllers/user/index.js";

const jwtSecret = "00000000";

const saltRounds = 10;

dotenv.config();
const app = express();

setupSwagger(app);
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });


app.use(express.json());
app.use(cors({
  origin: "http://localhost:4000",
  credentials: true,
}));

app.use(morgan('dev'));

connectDB();

app.listen(3000, () => console.log("listening at port 3000"));

app.get("/", (req, res) => {
  res.send("Hellow Meo");
});

app.get("/about", (req, res) => {
  res.send("Hellow About Meo");
});

app.get("/career", (req, res) => {
  res.send("Careers");
});

app.post('/api/user', authenticateToken, createUserProfile);

app.put('/api/user/:id', authenticateToken, updateUserProfile);

app.delete('/api/user/:id', authenticateToken, deleteUserProfile);

app.get('/api/user/:id', authenticateToken, getUserProfile);

app.post('/api/user/upload', authenticateToken, upload.single('file'), uploadUserFile);

// app.use('/uploads', express.static('uploads'));


app.post('/api/auth/signup', signup);

app.post('/api/auth/login', login);


app.get('/api/users', authenticateToken, getAllUsers);


app.post("/api/tasks", authenticateToken, createTask);

app.get("/api/tasks", authenticateToken, getAllTasks);

app.get("/api/tasks/:id", authenticateToken, getTaskById);

app.delete("/api/tasks/:id", authenticateToken, deleteTaskById);

app.get('/api/tasks/user/:userId', authenticateToken, getTasksByUser);

app.put("/api/tasks/:id", authenticateToken, updateTaskStatus);


app.post("/api/projects", authenticateToken, createProject);

app.get("/api/projects", authenticateToken, getAllProjects);

app.get("/api/projects/:id", authenticateToken, getProjectById);

app.delete("/api/projects/:id", authenticateToken, deleteProjectById);

app.put("/api/projects/:id", authenticateToken, updateProject);

app.get("/api/projects/user/:userId", authenticateToken, getProjectsByUser);