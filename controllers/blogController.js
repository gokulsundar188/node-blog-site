const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('./blog/index', { title: 'All blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_create_post = (req, res) => {
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
}

const blog_create_get = (req, res) => {
    res.render('./blog/create_blog', { title: 'Create a new blog' });
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(result);
            res.render('./blog/details', { blog: result, title: 'Blog details' })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render('./error/404', { title: '404' });
        });
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            console.log(result);
            res.send({ redirect: '/' });
        })
        .catch((err) => {
            console.log(err);
            // res.redirect('/');
            res.status(404).render('./error/404', { title: '404' });
        });
}

module.exports = {
    blog_index,
    blog_create_post,
    blog_create_get,
    blog_details,
    blog_delete
};