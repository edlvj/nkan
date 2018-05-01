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
  
  //newUser.password =  newUser.generateHash(newUser.password);
  newUser.save((err, user) => {
    if(err) {
      res.render('dashboard/user/new', {
        err: err 
      });
    } else {
      req.flash('success', req.t('dashboard.flash.created'));
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

    if(!req.body.admin) 
      req.body.admin = false;

    var newUser = Object.assign(user, req.body);

    //if(req.body.password)
     // newUser.password = 
    
    //password
    newUser.save((err, user) => {
      req.flash('success', req.t('dashboard.flash.updated'));
      res.redirect('/dashboard/user');
    }); 
  });
}

exports.delete = function(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if(err || !user) return next(err);

    User.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', req.t('dashboard.flash.deleted'));
      res.redirect('back');
    });
  });
}