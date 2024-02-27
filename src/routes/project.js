const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/project");
const authenticate = require("../middleware/authenticate");
const BidRoutes = require("./bid");

router.use("/bids", BidRoutes);

router.post("/", authenticate, ProjectController.createProject);

router.get("/", authenticate, ProjectController.getAllProjects);

router.get("/:id", authenticate, ProjectController.getProjectById);

module.exports = router;
