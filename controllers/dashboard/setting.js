var Setting = require('../../models/setting');

exports.edit = function(req, res, next) {
	res.render('dashboard/setting/form');
}

exports.update = function(req, res, next) {
	Setting.update(req.params.id, {
    title: req.body.title,,
    description: req.body.description,
    template: req.body.template,
  }).then(function(p) {
    req.flash('success', 'Setting updated.');
    res.redirect('back');
  }).catch(function(err) {
    if (err) {
      req.flash('warning', 'Something went wrong.');
      res.redirect('back');
    }
  });
}