var Page = require('../../models/page');

exports.index = function(req, res, next) {
  Page.find({}).exec((err, pages) => {
    if(err) return next(err); 

    res.render('dashboard/page', {
      pages: pages
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/page/new');
}

exports.create = function(req, res, next) {
  var newPage = new Page(req.body);

  newPage.save((err, page) => {
    if(err) {
      res.render('dashboard/page/new', {
        err: err 
      });
    } else {
      req.flash('success', 'Page created.');
      res.redirect('/dashboard/page');
    }  
  });
}

exports.edit = function(req, res, next) {
  Page.findById(req.params.id, (err, page) => {
    if(err || !page) return next(err);

    res.render('dashboard/page/edit', { page: page })
  }); 
}

exports.update = function(req, res, next) {
  Page.findById({_id: req.params.id}, (err, page) => {
    if(err || !page) return next(err);

    Object.assign(page, req.body).save((err, page) => {
      if(err) {
        res.render('dashboard/page/edit', { page: page, err: err });
      } else {
        req.flash('success', 'Page updated.');
        res.redirect('/dashboard/page');
      } 
    });
  });
}

exports.delete = function(req, res, next) {
  Page.findById(req.params.id, (err, page) => {
    if(err || !page) return next(err);

    Page.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'Page destroyed.');
      res.redirect('back');
    });
  });
}