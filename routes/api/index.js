var express = require('express');
var dataset = require('../../controllers/api/dataset');
var category = require('../../controllers/api/category');

var router = express.Router();

router.get('/datasets', dataset.index);
router.get('/dataset/:id', dataset.show);
router.get('/categories', category.index);

module.exports = router;
