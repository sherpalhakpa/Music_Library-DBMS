var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection  = require('./lib/db');

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees');
var concertsRouter = require('./routes/concerts');
var playlistsRouter = require('./routes/playlists');
var songsRouter = require('./routes/songs');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/employees', employeesRouter);
app.use('/concerts', concertsRouter);
app.use('/playlists', playlistsRouter);
app.use('/songs', songsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
 console.log('Go to http://localhost:3000 so you can see the data.');
});

module.exports = app;
