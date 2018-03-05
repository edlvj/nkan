exports.index = function(req, res, next) {
  res.render('dashboard/index');
};

exports.login = function(req, res, next) {
  res.render('dashboard/login', { user : req.user });
};

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};
