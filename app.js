const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
app.use(morgan('dev'));  //middleware

// routing
app.get('/', (req, res) => {
    const blogs = [
        { title: "Blog title", snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Blog title", snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Blog title", snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
    ];
    res.render('index', { title: 'Home', blogs });
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

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});