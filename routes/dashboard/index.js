var express = require('express');
var passport = require('passport');

var dashboard = require('../../controllers/dashboard');

var dataset = require('../../controllers/dashboard/dataset');
var user = require('../../controllers/dashboard/user');
var page = require('../../controllers/dashboard/page');
var category = require('../../controllers/dashboard/category');

var router = express.Router();

router.get('/', dashboard.index);

//page
router.route('/page')
  .get(page.index)
  .post(page.create);

router.get('/page/new', page.new);

router.route('/page/:id')
  .get(page.edit)
  .put(page.update)
 // .delete(page.delete);

// category
router.route('/category')
  .get(category.index)
  .post(category.create);

router.get('/category/new', category.new);

router.route('/category/:id')
  .get(category.edit)
  .put(category.update)
  .delete(category.delete);

//users

router.route('/user')
  .get(page.index)
  .post(page.create);

router.get('/user/new', user.new);

// datasets

router.route('/dataset')
  .get(dataset.index)
  .post(dataset.create);

router.get('/dataset/new', dataset.new);

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