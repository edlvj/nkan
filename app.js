var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var i18n = require('i18next');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./models/user');
var ensureLogined = require('./middlewares/ensure_logined');
var indexRoute = require('./routes/index');
var dashboardRoute = require('./routes/dashboard/index');

var app = express();

switch (process.env.NODE_ENV) {
  case 'test':
    var config = require('./config/test')
    break;
  default:
    var config = require('./config/test');
}

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

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
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

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
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
app.use(express.static(path.join(__dirname ,'/node_modules/datatables.net')));
app.use(express.static(path.join(__dirname ,'/node_modules/datatables.net-bs4')));

app.use(i18n.handle);
i18n.registerAppHelper(app);

app.use(function(req, res, next){
  res.locals.warning = req.flash('warning');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoute);
app.use('/dashboard', ensureLogined, dashboardRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  console.log( req.app.get('env'));

  res.render('500', {
    message: req.app.get('env') === 'development' ? err.message : 'Something went wrong',
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
