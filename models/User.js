const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING
    },
    twitterId: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = User