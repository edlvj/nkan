var Category = require('../../models/dataset/category');

exports.index = function(req, res, next) {
  Category.find({}).exec((err, categories) => {
    if(err) res.send(err);
    
    res.render('dashboard/category', {
      categories: categories
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/category/form')
}

exports.create = function(req, res, next) {
  var newCategory = new Category(req.body);

  newCategory.save((err, category) => {
    if(err) res.send(err);

    req.flash('success', 'Category created.');
    res.redirect('/dashboard/category');
  });
}

exports.edit = function(req, res, next) {
  Category.findById(req.params.id, (err, category) => {
    if(err) res.send(err);
    if(!category) res.status(404);

    res.render('dashboard/category/form', { category: category })
  });    
}

exports.update = function(req, res, next) {
  Category.findById({_id: req.params.id}, (err, category) => {
    if(err) res.send(err);
    if(!category) res.status(404);

    Object.assign(category, req.body).save((err, category) => {
      if(err) {
        req.flash('warning', 'Something went wrong.');
      }
      req.flash('success', 'Category updated.');
      res.redirect('/dashboard/category');
    }); 
  });
}

exports.delete = function(req, res, next) {
  Category.findById(req.params.id, (err, category) => {
    if(err) res.send(err);
    if(!category) res.status(404);

    Category.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'Category destroyed.');
      res.redirect('back');
    });
  });
}