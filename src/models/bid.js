const Sequelize = require("sequelize");
const sequelize = require("../utils/dbConfig");

const Bid = sequelize.define("Bid", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Bid;
