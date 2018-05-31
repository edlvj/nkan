var DataSet = require('../models/dataset');
var Category = require('../models/dataset/category');


exports.index = function(req, res, next) {
  var perPage = 10;
  var page = req.query.page || 1;

  datasetScope(req.query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, datasets) => {
      res.render('dataset/index', {
        datasets: datasets,
        current: page,
        pages: Math.ceil((datasets.length + 1) / perPage)
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

const datasetScope = function(query) {
  let scope = DataSet.find(); //.findActive();
  
  // if(query.search) {
  //   scope = scope.search(query.search);
  // }

  if(query.category) {
    scope = scope.byCategory(query.category);
  }

//  console.log(scope.schema);
  return scope;
}