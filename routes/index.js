var express = require('express');
var passport = require('passport');

var dataset = require('../controllers/dataset');
var page = require('../controllers/page');
var router = express.Router();

router.get('/', dataset.index);
router.get('/dataset/:slug', dataset.show);
router.get('/page/:slug', page.show);

module.exports = router;
