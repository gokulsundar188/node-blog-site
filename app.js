const express = require('express');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', 'newViewFolder');

app.listen(3000);

// routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.use((req, res) => {
    res.render('404');
});