var DataSet = require('../models/dataset');

exports.index = function(req, res, next) {
  DataSet.find({ status: 2 }).exec((err, datasets) => {
    res.render('dataset/index', {
      datasets: datasets
    });
  });
}

exports.show = function(req, res, next) {
  DataSet
    .findOne({ slug: req.params.slug })
    .populate('files')
    .exec((err, dataset) => {
      if(err || !dataset) return next(err);

      res.render('dataset/show', {
        dataset: dataset
      });
  });
}