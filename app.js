var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var i18n = require('i18next');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
var ensureLogined = require('./middlewares/ensure_logined');
var indexRoute = require('./routes/index');
var dashboardRoute = require('./routes/dashboard/index');

var app = express();
var config = require('./config');

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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//User.authenticate()

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    console.log(email);
    User.findOne({ email: email }, function(err, user) {
      console.log(err);
      if (err) { return done(err); }
      if (!user || !user.validPassword(password)) {
        console.log('hi');
        return done(null, false, { message: 'email or password.' });
      }
      return done(null, user);
    });
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname ,'/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname ,'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname ,'/node_modules/font-awesome')));

app.use(i18n.handle);
i18n.registerAppHelper(app);

app.use('/', indexRoute);
app.use('/dashboard', ensureLogined, dashboardRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status);

  if(err.status == 404) {
    res.render('404');
  }

  res.render('500');
});

module.exports = app;
