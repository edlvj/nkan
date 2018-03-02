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
  res.render('dashboard/category/form')
}

exports.create = function(req, res, next) {
  Category.create({
    name: req.body.name,
    url: req.body.url
  }).then(function(c) {
    req.flash('success', 'Category created.');
    res.redirect('/dashboard/categories');
  }).catch(function(err) {
    if(err)
      req.flash('warning', 'Something went wrong.');
      res.redirect('/dashboard/categories');
  });
}

exports.destroy = function(req, res, next) {
  Category.destroyById(req.params.id)
    .then(function() {
      req.flash('success', 'Category destroyed.');
      res.redirect('/dashboard/categories');
    }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('back');
    }
  });
}
