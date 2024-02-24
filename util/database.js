const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', 'ujjwal@420', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;