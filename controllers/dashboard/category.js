var Category = require('../../models/dataset/category');

exports.index = function(req, res, next) {
  Category.find({}).exec((err, categories) => {
    if(err) return next(err); 

    res.render('dashboard/category', {
      categories: categories
    });
  });
}

exports.new = function(req, res, next) {
  let category = new Category();
  res.render('dashboard/category/new', { 
    category: category 
  });
}

exports.create = function(req, res, next) {
  let newCategory = new Category(req.body); 

  newCategory.save((err, category) => {
    if(err) {
      res.render('dashboard/category/new', {
        err: err 
      });
    } else {
      req.flash('success', 'Category created.');
      res.redirect('/dashboard/category');
    }    
  });
}

exports.edit = function(req, res, next) {
  Category.findById(req.params.id, (err, category) => {
    if(err || !category) return next(err);

    res.render('dashboard/category/edit', {
      category: category 
    });
  });    
}

exports.update = function(req, res, next) {
  Category.findById({_id: req.params.id}, (err, category) => {
    if(err || !category) return next(err);

    Object.assign(category, req.body).save((err, category) => {
      if(err) {
        res.render('dashboard/category/edit', { category: category, err: err });
      } else {
        req.flash('success', 'Category updated.');
        res.redirect('/dashboard/category');
      } 
    }); 
  });
}

exports.delete = function(req, res, next) {
  Category.findById(req.params.id, (err, category) => {
    if(err || !category) return next(err);

    Category.remove({_id : category.id}, (err, result) => {
      req.flash('success', 'Category destroyed.');
      res.redirect('back');
    });
  });
}