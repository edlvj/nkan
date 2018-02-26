var express = require('express');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('user/login', { user : req.user });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

module.exports = router;