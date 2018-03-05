var Page = require('../../models/page');

exports.index = function(req, res, next) {
  Page.find({}).exec((err, pages) => {
    if(err) res.send(err);
    
    res.render('dashboard/page', {
      pages: pages
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/page/form');
}

exports.create = function(req, res, next) {
  var newPage = new Page(req.body);

  newPage.save((err, page) => {
    if(err) res.send(err);

    req.flash('success', 'Page created.');
    res.redirect('/dashboard/page');
  }); 
}

exports.edit = function(req, res, next) {
  Page.findById(req.params.id, (err, page) => {
    if(err) res.send(err);
    if(!page) res.status(404);

    res.render('dashboard/page/form', { page: page })
  }); 
}

exports.update = function(req, res, next) {
  Page.findById({_id: req.params.id}, (err, page) => {
    if(err) res.send(err);
    if(!page) res.status(404);

    Object.assign(page, req.body).save((err, page) => {
      if(err) {
        req.flash('warning', 'Something went wrong.');
      }
      req.flash('success', 'Page updated.');
      res.redirect('/dashboard/page');
    });
  });
}

exports.delete = function(req, res, next) {
  Page.findById(req.params.id, (err, page) => {
    if(err) res.send(err);
    if(!page) res.status(404);

    Page.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'Page destroyed.');
      res.redirect('back');
    });
  });
}