var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var i18n = require('i18next');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRoute = require('./routes/index');
var userRoute = require('./routes/user');
var dashboardRoute = require('./routes/dashboard/index');

var app = express();
var config = require('./config');

// i'm here
mongoose.connect(config.db, function(err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

i18n.init({
    lng: 'ua',
    fallbackNS: 'en-US',
    ignoreRoutes: ['public/'],
    useCookie: false,
    debug: true
});


// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'templates/' + config.template) ]);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/user');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname ,'/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname ,'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname ,'/node_modules/font-awesome')));

app.use(i18n.handle);
i18n.registerAppHelper(app);

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/dashboard', dashboardRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
