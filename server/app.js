var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');


mongoose.connect('mongodb://localhost:27017/mymongodb', {
    useNewUrlParser: true
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/message', messageRoutes); //this is specfic routes which shld be first then generic routes like-'/'
app.use('/', appRoutes); //generic routes which shld be not be written first bcoz - then all the routes will be navigated to appRoutes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
    //if 404 error's occured then go to index.hbs which internally goes to angular-2 code
    //thus the error page is should in Angular-2 (by creating-Angular error page component)
});

app.listen(4000);

module.exports = app;