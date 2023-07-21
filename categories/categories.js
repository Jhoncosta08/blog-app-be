const express = require('express');
const router = express.Router();
const categoryModel = require('./category-model');
const articlesModel = require('../articles/article-model');
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
            if(response) {
                res.json(response);
            }else {
                res.status(400);
            }
        }).catch(err => console.error('Error in create categoy', err));
    }
});

router.delete('/categories/delete/:id', (req, res) => {
   const id = req.params.id;
   if(id) {
       categoryModel.destroy({
           where: {id: id}
       }).then(response => {
           if(response) {
               res.json(response);
           }else {
               res.status(400);
           }
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
           if(response) {
               res.json(response);
           }else {
               res.status(400);
           }
       }).catch(err => console.error('Error in update category', err));
   }
});

router.get('/categories/id/:id', (req, res) => {
   const id = req.params.id;
   if(id) {
       categoryModel.findByPk(id).then(category => {
           if(category) {
               res.json(category);
           }else {
               res.status(400);
           }
       }).catch(err => console.error('Error in find category', err));
   }
});

router.get('/categories/slug/:slug', (req, res) => {
   const slug = req.params.slug;
   if(slug) {
       categoryModel.findOne({
           where: {slug: slug},
           include: [{model: articlesModel}]
       }).then(category => {
           if(category) {
               res.json(category);
           }else {
               res.status(400);
           }
       }).catch(err => console.error('error in get category', err));
   }
});

router.get('/categories', (req, res) => {
    categoryModel.findAll().then(categories => {
        if(categories) {
            res.json(categories);
        }else {
            res.status(400);
        }
    }).catch(err => console.error('Error in get all categories', err));
});


module.exports = router;