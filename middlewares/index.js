var Category = require('../models/dataset/category');
var Page = require('../models/page');

var categories = function(req, res, next) {
  Category.find({}).exec((err, categories) => {
    res.locals.categories = categories;
    next();
  });
};

var pages = function(req, res, next) {
  Page.find({}).exec((err, pages) => {
    res.locals.pages = pages;
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
  pages,
  ensureLogged,
  ensureNotLogged
}