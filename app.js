const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// Connect to mongoDB
const dbURI = 'mongodb+srv://TestUser:test123@blogdemo.ckmee.mongodb.net/BlogDemo?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
        app.listen(2000);
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// app.set('views', 'newViewFolder');

// Middleware & Static files

// app.use((req, res, next) => {  //middleware
//     console.log('New request made==>');
//     console.log(`Host: ${req.hostname}`);
//     console.log(`Path: ${req.path}`);
//     console.log(`Method: ${req.method}`);
//     next();  //if we not invoke this next method execution will hang in before line, so we need to tell express to move next execution.
// });

// app.use(express.static(__dirname + '/public')); //Static
app.use(express.static('public')); //Static
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));  //middleware


// routing
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


app.get('/blogs/create', (req, res) => {
    res.render('create_blog', { title: 'Create a new blog' });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/blogs', (req, res) => {
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            // alert('Blog created');
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => {
            // alert('Blog created');
            console.log(err);
            res.redirect('/');
        })
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            console.log(result);
            res.render('details', { blog: result, title: 'Blog details' })
        })
        .catch((err) => { console.log(err); });
});

app.delete('/blogs/:id', (req, res) => {
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


// mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog',
        snippet: 'This is test blog',
        body: 'This is test blog. it contains use less text'
    });

    blog.save()
        .then((result) => { res.send(result) })
        .catch((err) => { console.log(err) });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => { res.send(result); })
        .catch((err) => {
            res.send(err);
            console.log(err);
        });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('600d3ff995a3a00b14d301f2')
        .then((result) => { res.send(result); })
        .catch((err) => {
            res.send(err);
            console.log(err);
        });
})


app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});