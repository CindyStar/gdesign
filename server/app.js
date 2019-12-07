var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var db = require('./apis/db');
var users = require('./apis/routes/user');
var types = require('./apis/routes/type');
var comments = require('./apis/routes/comment');
var calltypes = require('./apis/routes/calltype');
var callbacks = require('./apis/routes/callback');
var articles = require('./apis/routes/article');

app.use('/apis/', users);
app.use('/apis/', types);
app.use('/apis/', comments);
app.use('/apis/', calltypes);
app.use('/apis/', callbacks);
app.use('/apis/', articles);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/public', express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;