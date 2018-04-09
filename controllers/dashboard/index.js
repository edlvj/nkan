var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
  //var count = DataSet.find({}).count();
  var count = 0;
  res.render('dashboard/index', { count: count });
};