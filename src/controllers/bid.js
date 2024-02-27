const Bid = require("../models/bid");
const Project = require("../models/project");
const User = require("../models/user");

const BidController = {
  placeBid: async (req, res) => {
    try {
      const { projectId, amount } = req.body;
      const userId = req.user.id;
			console.log("TCL: userId", userId)

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const newBid = await Bid.create({
        amount,
        projectId: projectId,
        userId: userId,
      });
      res.status(201).json(newBid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBidsForProject: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const bids = await Bid.findAll({
        where: { projectId: projectId },
        include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
      });

      res.status(200).json(bids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  assignBidToUser: async (req, res) => {
    try {
      const { projectId } = req.params;

      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const currentDate = new Date();
      if (currentDate > project.expirationDate) {
        return res.status(400).json({ error: "Project has already expired" });
      }

      const smallestBid = await Bid.findOne({
        where: { projectId: projectId },
        order: [["amount", "ASC"]],
        attributes: ["id", "amount", "userId"],
      });

      if (!smallestBid) {
        return res.status(404).json({ error: "No bids found for the project" });
      }

      const assignedUser = await User.findByPk(smallestBid.userId);

      await project.update({
        assignedUserId: assignedUser.id,
        status: "assigned",
      });

      res
        .status(200)
        .json({ message: "Project assigned successfully", assignedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = BidController;
