var DataSet = require('../models/dataset');

exports.index = function(req, res, next) {
  DataSet.find({}).exec((err, datasets) => {
    res.render('dataset/index', {
      datasets: datasets
    });
  });
}

exports.show = function(req, res, next) {
  res.render('dataset/show')
}