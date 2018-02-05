var express = require('express');
var dashboard = require('../../controllers/dashboard');

var router = express.Router();

router.get('/', dashboard.index);

module.exports = router;