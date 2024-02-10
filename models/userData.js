const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,

    },
    email: {
        type: Sequelize.STRING,

    },
    phone: {
        type: Sequelize.DOUBLE,

    },
    message: {
        type: Sequelize.STRING,

    }
});

module.exports = User;