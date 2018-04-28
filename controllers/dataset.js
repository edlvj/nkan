var DataSet = require('../models/dataset');

exports.index = function(req, res, next) {
  DataSet.find({ status: 1 }).exec((err, datasets) => {
    res.render('dataset/index', {
      datasets: datasets
    });
  });
}

exports.show = function(req, res, next) {
  res.render('dataset/show')
}