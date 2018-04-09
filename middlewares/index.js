var Category = require('../models/dataset/category');

var categories = function(req, res, next) {
  Category.find({}).exec((err, categories) => {
    res.locals.categories = categories;
    next();
  });
};

var ensureLogged = function(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

var ensureNotLogged = function(req, res, next) {
  if(!req.user) {
    next();
  } else {
    res.redirect('/dashboard');
  }
}

module.exports = { 
  categories,
  ensureLogged,
  ensureNotLogged
}