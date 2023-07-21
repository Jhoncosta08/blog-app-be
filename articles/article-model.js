const sequelize = require('sequelize');
const connection = require('../database/database');
const categoryModel = require('../categories/category-model');

const articleModel = connection.define('articles', {
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
        allowNull: false,
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

categoryModel.hasMany(articleModel);
articleModel.belongsTo(categoryModel);

// articleModel.sync({force: true}).then(r => {
//     console.log('Article model has sync successfully', r)
// }).catch(err => {
//     console.error('Error when tried sync the article model', err);
// });
module.exports = articleModel;