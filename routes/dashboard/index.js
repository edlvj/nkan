var express = require('express');
var dashboard = require('../../controllers/dashboard');
var category = require('../../controllers/dashboard/category');

var router = express.Router();

router.get('/', dashboard.index);
router.get('/category', category.index);
router.get('/category/new', category.new);
router.post('/category', category.create);

module.exports = router;