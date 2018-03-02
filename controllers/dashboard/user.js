var User = require('../../models/user');

exports.index = function(req, res, next) {
  User.findAll()
    .then(function(users) {
      res.render('dashboard/user', {
        users: users
      });
    });
}

exports.new = function(req, res, next) {
  res.render('dashboard/user/form');
}

exports.create = function(req, res, next) { 
  User.create({
    title: title,
    contents: contents,
    url: url,
    category: category,
    keywords: keywords
  }).then(function(p) {
    req.flash('success', 'User added.');
    res.redirect('/dashboard/users');
  }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('/dashboard/users');
    }
  });   
}

exports.edit = function(req, res, next) {
  User.findOneById(id).then(function(p) {
    res.render('/dashboard/users/form', {});
  }).catch(function(err) {
    if (err) {
      res.send(404);
    }
  }); 
}

exports.update = function(req, res, next) {
  User.updateById(req.params.id, {
    email: req.body.email,
    password: this.generateHash(req.body.password),
    admin: req.body.admin,
  }).then(function(p) {
    req.flash('success', 'User updated.');
    res.redirect('back');
  }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('back');
    }
  });
}

exports.destroy = function(req, res, next) {
  User.destroyById(req.params.id)
    .then(function() {
      req.flash('success', 'User destroyed.');
      res.redirect('/dashboard/users');
    }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('back');
    }
  });
}