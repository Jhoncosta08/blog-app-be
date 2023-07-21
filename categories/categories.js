const express = require('express');
const router = express.Router();
const categoryModel = require('./category-model');
const crypto = require('crypto');
const slugify = require('slugify');

router.post('/categories/new', (req, res) => {
    if(req.body.title){
        const reqBodyTitle = req.body.title;
        categoryModel.create({
            id: crypto.randomUUID(),
            title: reqBodyTitle,
            slug: slugify(reqBodyTitle)
        }).then(response => {
            res.json(response);
        }).catch(err => console.error('Error in create categoy', err));
    }
});


module.exports = router;