var Category = require('../../models/dataset/category');

exports.index = function(req, res, next) {
  Category.findAll()
    .then(function(categories) {
      res.render('dashboard/category', {
        categories: categories
      });
    });
}

exports.new = function(req, res, next) {
  res.render('dashboard/category/new')
}

exports.create = function(req, res, next) {
  var name = req.body.name;
  var url  = req.body.url;

  Category.create({
    name: name,
    url: url
  }).then(function(c) {
    res.redirect('/dashboard/categories');
  }).catch(function(err) {
    if(err)
      res.redirect('/dashboard/categories');
  });
}

exports.destroy = function(req, res, next) {
  console.log('destroy');
}
