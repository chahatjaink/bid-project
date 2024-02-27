const { Sequelize } = require("sequelize");
const { ENVIORMENTAL_VARIABLES } = require("../config/config");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } =
  ENVIORMENTAL_VARIABLES;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

module.exports = sequelize;
