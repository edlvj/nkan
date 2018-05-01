var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
  DataSet.count({},function(err, count) {
    res.render('dashboard/index', { count: count });
  });
};