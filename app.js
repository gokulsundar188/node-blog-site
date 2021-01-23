const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// app.set('views', 'newViewFolder');

app.listen(2000);

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
    res.render('404', { title: '404' });
});