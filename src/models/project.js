const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConfig");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  attachment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Project;
