import Project from '../../models/Project/index.js';

export const createProject = async (req, res) => {

  console.log('Authenticated user:', req.user);

  console.log('AUTH HEADER:', req.headers.authorization);

  try {
    const userId = req.user.userId;
    const {
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      members,
    } = req.body;

    const project = new Project({
      name,
      description,
      status,
      priority,
      startDate,
      endDate,
      createdBy: userId,
      members,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {

    console.error("❌ Error in createProject:", err);


    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await Project.find({ createdBy: userId })
      .populate("createdBy", "username email")
      .populate("members", "username email");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    })
      .populate("createdBy", "username email")
      .populate("members", "username email");

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project", error: err.message });
  }
};

export const deleteProjectById = async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!deletedProject)
      return res.status(404).json({ message: "Project not found or unauthorized" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateFields = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      updateFields,
      { new: true }
    )
      .populate("createdBy", "username email")
      .populate("members", "username email");

    if (!project)
      return res.status(404).json({ message: "Project not found or unauthorized" });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error updating project", error: err.message });
  }
};

export const getProjectsByUser = async (req, res) => {
  try {
    const projects = await Project.find({ members: req.params.userId })
      .populate("createdBy", "username email")
      .populate("members", "username email");

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user projects", error: err.message });
  }
};
