const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const _blogRouter = require('./routes/blogRoute');
const _aboutRouter = require('./routes/aboutRoute');
const _homeRouter = require('./routes/homeRoute');
const _404Router = require('./routes/404Route');
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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routing
app.use('/', _homeRouter);
app.use('/blogs', _blogRouter);
app.use(_aboutRouter);
app.use(_404Router);
