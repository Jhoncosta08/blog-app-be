const { Sequelize } = require('sequelize');

const connection = new Sequelize('blogApp', 'root', '5897', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;