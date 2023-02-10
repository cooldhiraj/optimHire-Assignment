global.root = __dirname
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var policyRouter = require('./routes/policy');

var app = express();
require('./db/connection')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', policyRouter);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

module.exports = app;
