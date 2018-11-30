var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//var port = 3000;

// The only required route is for the calls to the booker API
var booker = require('./routes/booker');

// Makes the generated html easier to read
app.locals.pretty = true;

// View engine setup. This is only for the error page as the rest is
// generated by the client application (Angular).
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Indicate teh middleware that Express should use
app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// The 'src' folder will contain the files that need to be accessed
// by the client app (Angular).
app.use(express.static(path.join(__dirname, 'src')));

app.use('/booker', booker);

// For any other routes, set the status to 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
