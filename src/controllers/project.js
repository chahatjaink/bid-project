const Project = require("../models/project");
const User = require("../models/user");

const ProjectController = {
  createProject: async (req, res) => {
    try {
      const { name, expiryDate, attachment } = req.body;

      const userId = req.user.id;

      const user = await User.findByPk(userId);
      if (!user || user.role !== "admin") {
        return res
          .status(403)
          .json({ error: "Unauthorized: Only admin can create projects" });
      }

      const newProject = await Project.create({
        name,
        expiryDate,
        attachment,
        userId: user.id,
      });

      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProjectController;
