var express = require('express');

var dashboard = require('../../controllers/dashboard');

var dataset = require('../../controllers/dashboard/dataset');
var user = require('../../controllers/dashboard/user');
var page = require('../../controllers/dashboard/page');
var category = require('../../controllers/dashboard/category');

var router = express.Router();

//pages
router.route('/page')
  .get(page.index)
  .post(page.create);

router.get('/page/new', page.new);

router.route('/page/:id')
  .get(page.edit)
  .put(page.update)
  .delete(page.delete);

// categories
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
  .get(user.index)
  .post(user.create);

router.get('/user/new', user.new);

router.route('/user/:id')
  .get(user.edit)
  .put(user.update)
  .delete(user.delete);

// datasets
router.route('/dataset')
  .get(dataset.index)
  .post(dataset.create);

router.get('/dataset/new', dataset.new);

router.route('/dataset/:id')
  .get(dataset.edit)
  .put(dataset.update)
  .delete(dataset.delete);

//dashboard
router.get('/', dashboard.index);

module.exports = router;