const sequelize = require('sequelize');
const connection = require('../database/database');

const categoryModel = connection.define('categories', {
    id: {
        primaryKey: true,
        type: sequelize.STRING,
        allowNull: false
    },
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false
    }
});

// categoryModel.sync({force: true}).then(r => {
//     console.log('Category model has sync successfully', r)
// }).catch(err => {
//     console.error('Error when tried sync the category model', err);
// });
module.exports = categoryModel;