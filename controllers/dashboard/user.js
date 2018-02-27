var User = require('../../models/user');

exports.index = function(req, res, next) {
  res.render('dashboard/user/');
}

exports.create = function(req, res, next) {
  console.log(req.body);
  req.flash('warning', 'That email is already taken.');
  res.redirect('/dashboard/users');

  // process.nextTick(function() {
  //   User.findOne({ 'email':  req.body.email }, function(err, user) {
  //     if (err)
  //       throw err;

  //     if (user) {
  //       req.flash('warning', 'That email is already taken.');
  //     } else {
  //       var newUser = new User();

  //       console.log(newUser);

  //       newUser.email    = req.body.email;
  //       newUser.password = newUser.generateHash(req.body.password);
  //       newUser.admin = req.body.admin; 

  //       newUser.save(function(err) {
  //         if (err)
  //           throw err;
          
  //         req.flash('success', 'User successfully added.');
  //       });
  //     } 
  //     res.redirect('/dashboard/users');
  //   });
  // });     
}

exports.new = function(req, res, next) {
  res.render('dashboard/user/new');
}
