const express = require("express");
const sequelize = require("./src/utils/dbConfig");
const userRoutes = require("./src/routes/user");
const projectRoutes = require("./src/routes/project");

const Project = require("./src/models/project");
const User = require("./src/models/user");
const Bid = require("./src/models/bid");
const { ENVIORMENTAL_VARIABLES } = require("./src/config/config");

const app = express();

const port = ENVIORMENTAL_VARIABLES.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Healt Check Route");
});

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

Project.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Project, {
  foreignKey: "userId",
  as: "projects",
});

Bid.belongsTo(User);
Bid.belongsTo(Project);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((err) => {
    console.log("TCL: err", err);
  });
