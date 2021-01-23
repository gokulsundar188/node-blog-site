const express = require('express');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'newViewFolder');

app.listen(2000);

// routing
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
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
    res.render('404', { title: '404' });
});