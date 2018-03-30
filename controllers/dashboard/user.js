var User = require('../../models/user');

exports.index = function(req, res, next) {
  User.find({}).exec((err, users) => {
    if(err) return next(err); 

    res.render('dashboard/user', {
      users: users
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/user/new');
}

exports.create = function(req, res, next) { 
  var newUser = new User(req.body);

  newUser.save((err, user) => {
    if(err) {
      res.render('dashboard/user/new', {
        err: err 
      });
    } else {
      req.flash('success', 'User created.');
      res.redirect('/dashboard/user');
    }  
  });  
}

exports.edit = function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if(err || !user) return next(err);

    res.render('dashboard/user/edit', { user: user })
  });  
}

exports.update = function(req, res, next) {
  User.findById({_id: req.params.id}, (err, user) => {
    if(err || !user) return next(err);

    Object.assign(user, req.body).save((err, user) => {
      if(err) {
        req.flash('warning', 'Something went wrong.');
      }
      req.flash('success', 'User updated.');
      res.redirect('/dashboard/user');
    }); 
  });
}

exports.delete = function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if(err || !user) return next(err);

    User.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'User destroyed.');
      res.redirect('back');
    });
  });
}