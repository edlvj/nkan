var express = require('express');
var passport = require('passport');
var user = require('../../models/user');

var dashboard = require('../../controllers/dashboard');
var category = require('../../controllers/dashboard/category');
var user = require('../../controllers/dashboard/user');
var page = require('../../controllers/dashboard/page');

var router = express.Router();

router.get('/', dashboard.index);

router.get('/pages', page.index);
router.get('/page/new', page.new);

router.get('/categories', category.index);
router.get('/category/new', category.new);
router.post('/category', category.create);

router.get('/users', user.index);
router.get('/user/new', user.new);
router.post('/user', user.create);

router.get('/login', function(req, res, next) {
  res.render('dashboard/login', { user : req.user });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

module.exports = router;