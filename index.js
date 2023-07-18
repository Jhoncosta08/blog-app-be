const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;
const crypto = require('crypto');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const connection = require('./database/database');


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