var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
  //var count = DataSet.find({}).count();
  res.render('dashboard/index', { count: count });
};

exports.login = function(req, res, next) {
  res.render('dashboard/login', { user : req.user });
};

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};
