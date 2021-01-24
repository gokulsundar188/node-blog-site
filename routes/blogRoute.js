const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        })
});


router.get('/create', (req, res) => {
    res.render('create_blog', { title: 'Create a new blog' });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(result);
            res.render('details', { blog: result, title: 'Blog details' })
        })
        .catch((err) => { console.log(err); });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            console.log(result);
            res.send({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});


module.exports = router;