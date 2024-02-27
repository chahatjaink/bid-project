require("dotenv").config();

exports.ENVIORMENTAL_VARIABLES = {
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "admin",
  DB_NAME: process.env.DB_NAME || "postgres",
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  JWT_SECRET: process.env.JWT_SECRET || "your_secret_key",
};
