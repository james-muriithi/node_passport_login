const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING
    }
})

module.exports = User