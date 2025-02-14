require('dotenv').config();
const { Sequelize } = require('sequelize');

// Kết nối tới MySQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

module.exports = sequelize;
