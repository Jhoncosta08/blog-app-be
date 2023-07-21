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

router.delete('/categories/delete/:id', (req, res) => {
   const id = req.params.id;
   if(id) {
       categoryModel.destroy({
           where: {id: id}
       }).then((response) => {
           res.json(response);
       }).catch(err => console.error('Error in delete category', err));
   }
});

router.post('/categories/edit/:id', (req, res) => {
   const id = req.params.id;
   const title = req.body.title;
   if(id && title) {
       categoryModel.update(
           {title: title, slug: slugify(title)}, {where: {id: id}}
       ).then(response => {
           res.json(response);
       }).catch(err => console.error('Error in update category', err));
   }
});

router.get('/categories/:id', (req, res) => {
   const id = req.params.id;
   if(id) {
       categoryModel.findByPk(id).then(category => {
           if(category) {
               res.json(category);
           }
       }).catch(err => console.error('Error in find category', err));
   }
});

router.get('/categories', (req, res) => {
    categoryModel.findAll().then(categories => {
        res.json(categories);
    }).catch(err => console.error('Error in get all categories', err));
});


module.exports = router;