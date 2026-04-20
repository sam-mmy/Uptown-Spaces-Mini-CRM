const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    pool: {
      max: 10, //max open DB connections
      min: 0, //minimum idle connections
      acquire: 30000, //max wait time for connection
      idle: 10000 //idle timeout before release
    },

    logging: false
  }
);

module.exports = sequelize;