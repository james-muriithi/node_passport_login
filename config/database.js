const Sequelize = require('sequelize');
require('dotenv').config()

module.exports = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    dialect: 'postgres'
})