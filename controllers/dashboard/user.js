var User = require('../../models/user');

exports.index = function(req, res, next) {
  User.find({}).exec((err, users) => {
    if(err) res.send(err);
    
    res.render('dashboard/user', {
      users: users
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/user/form');
}

exports.create = function(req, res, next) { 
  //console.log(req.body);

  var newUser = new User(req.body);

  newUser.save((err, user) => {
    if(err) res.send(err);

    req.flash('success', 'User created.');
    res.redirect('/dashboard/user');
  });  
}

exports.edit = function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if(err) res.send(err);
    if(!user) res.status(404);

    res.render('dashboard/user/form', { user: user })
  });  
}

exports.update = function(req, res, next) {
  User.findById({_id: req.params.id}, (err, user) => {
    if(err) res.send(err);
    if(!user) res.status(404);

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
    if(err) res.send(err);
    if(!user) res.status(404);

    User.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'User destroyed.');
      res.redirect('back');
    });
  });
}