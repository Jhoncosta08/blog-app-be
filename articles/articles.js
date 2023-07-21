const express = require('express');
const articlesModel = require('../articles/article-model');
const categoryModel = require('../categories/category-model');
const crypto = require("crypto");
const slugify = require("slugify");
const router = express.Router();


router.post('/articles/new', (req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const categoryId = req.body.categoryId
    if(title && body && categoryId){
        articlesModel.create({
            id: crypto.randomUUID(),
            title: title,
            body: body,
            slug: slugify(title),
            categoryId: categoryId
        }).then(response => {
            if(response) {
                res.json(response);
            }else {
                res.status(400);
            }
        }).catch(err => console.error('Error in create article', err));
    }
});

router.delete('/articles/delete/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        articlesModel.destroy({
            where: {id: id}
        }).then((response) => {
            if(response) {
                res.json(response);
            }else {
                res.status(400);
            }
        }).catch(err => console.error('Error in delete article', err));
    }
});

router.post('/articles/edit/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    const categoryId = requ.body.categoryId
    if(id && title && body && categoryId) {
        articlesModel.update(
            {title: title, slug: slugify(title), body: body, categoryId: categoryId}, {where: {id: id}}
        ).then(response => {
            if(response) {
                res.json(response);
            }else {
                res.status(400);
            }
        }).catch(err => console.error('Error in update article', err));
    }
});

router.get('/articles/id/:id', (req, res) => {
    const id = req.params.id;
    if(id) {
        articlesModel.findByPk(id, {
            include: [{
                model: categoryModel
            }]}).then(article => {
            if(article) {
                res.json(article);
            }else {
                res.status(400);
            }
        }).catch(err => console.error('Error in find article', err));
    }
});

router.get('/articles', (req, res) => {
    articlesModel.findAll({
            include: [{
                model: categoryModel
            }]
    }).then(articles => {
        if(articles) {
            res.json(articles);
        }else {
            res.status(400);
        }
    }).catch(err => console.error('Error in get all article', err));
});


module.exports = router;