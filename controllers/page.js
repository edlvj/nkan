var Page = require('../models/page');

exports.show = function(req, res, next) {
  Page.findOne({slug: req.params.slug }, (err, page) => {
    if(err || !page) return next(err);
    res.render('page/show', { page: page, err: err });
  });
}