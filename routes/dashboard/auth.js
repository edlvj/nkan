var express = require('express');
var passport = require('passport');

var router = express.Router();
var { ensureLogged, ensureNotLogged } = require('../../middlewares/index');

router.get('/login', ensureNotLogged, function(req, res) {
  res.render('dashboard/auth/login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), ensureNotLogged, function(req, res) {
  res.redirect('/');
});

router.get('/logout', ensureLogged, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;