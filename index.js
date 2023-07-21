const express = require('express');
const app = express();
const connection = require('./database/database');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;


app.use(express.urlencoded({extended: true}));
app.use(express.json());

//routers variables
const categories = require('./categories/categories');
const articles = require('./articles/articles');

//sequelize models
const articlesModel = require('./articles/article-model');
const categoryModel = require('./categories/category-model');

//Initial config
connection.authenticate().then(() => {
   console.log('Database connected...');
}).catch(err => {
   console.log('Error in database connection', err);
})

app.get('/', (req, res) => {
   res.send('Blog app is running...');
});

app.listen(port, () => {
   console.log(`[server]: Server is running at http://localhost:${port}`);
});

//routers
app.use('/', categories);
app.use('/', articles);

