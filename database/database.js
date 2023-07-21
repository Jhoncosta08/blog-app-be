const { Sequelize } = require('sequelize');

const connection = new Sequelize('blogApp', 'root', '5897', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;