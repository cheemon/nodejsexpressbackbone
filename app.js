var express = require('express');
var fs= require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
var dbPath = 'mongodb://localhost/photograph';
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Import the data layer
var mongoose = require('mongoose');
var config = {
  mail: require('./config/mail')
};
// Import the models
var models = {
    Account: require('./models/Account')(config, mongoose),
    Album: require('./models/Album')(config, mongoose),
    Photo: require('./models/Photo')(config, mongoose),
    Article: require('./models/Article')(config, mongoose)
};
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
});

// Import the routes
fs.readdirSync('routes').forEach(function(file) {
    if ( file[0] == '.' ) return;
    var routeName = file.substr(0, file.indexOf('.'));
    require('./routes/' + routeName)(app, models);
});
// catch 404 and forward to error handler
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
      console.log('production error handler');
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

app.listen(8080,function(){
  console.log("listening to port 8080.");
});

module.exports = app;
