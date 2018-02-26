var category = require('../../models/dataset/category');

exports.index = function(req, res, next) {
  console.log('category index');
  category.findAll()
    .then(function(categories) {
      res.render('dashboard/category', {
        categories: categories
      });
    });
}

exports.new = function(req, res, next) {
  console.log('category show');
  res.render('dashboard/category/new')
}

exports.create = function(req, res, next) {
  var name = req.body.name;
  var url  = req.body.url;

  category.create({
    name: name,
    url: url
  }).then(function(c) {
    res.redirect('/admin/category/view');
  }).catch(function(err) {
    if(err)
      res.redirect('/admin/category/view');
  })
}

exports.destroy = function(req, res, next) {
  console.log('destroy');
}
