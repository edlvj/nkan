var Page = require('../../models/page');

exports.index = function(req, res, next) {
  Page.findAll()
    .then(function(pages) {
      res.render('dashboard/page', {
        pages: pages
      });
    });
}

exports.new = function(req, res, next) {
  res.render('dashboard/page/form');
}

exports.create = function(req, res, next) {
  Page.create({
    title: req.body.title,
    body: req.body.body
  }).then(function(p) {
    req.flash('success', 'Post added.');
    res.redirect('/dashboard/posts');
  }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('/dashboard/posts');
    }
  }); 
}

exports.edit = function(req, res, next) {
  Page.findOneById(id).then(function(p) {
    res.render('/dashboard/users/form', {});
  }).catch(function(err) {
    if (err) {
      res.send(404);
    }
  }); 
}

exports.destroy = function(req, res, next) {
  Page.destroyById(req.params.id)
    .then(function() {
      req.flash('success', 'Page destroyed.');
      res.redirect('/dashboard/pages');
    }).catch(function(err) {
      if (err) {
        req.flash('warning', 'Something went wrong.');
        res.redirect('back');
      }
  });
}