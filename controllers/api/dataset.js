var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
  var perPage = 10;
  var page = req.query.page || 1;
  
  DataSet.findActive()
    .populate('files', ['name', 'path'])
    .populate('categories', 'title')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, datasets) => {
      var pagination = {
        pagination: {
          current: page,
          pages: Math.ceil((datasets.length + 1) / perPage)
        }
      };

      var data = Object.assign({}, datasets, pagination);
      res.json(data);
  });
}

exports.show = function(req, res, next) {
  DataSet
    .findOne({ _id: req.params.id })
    .populate('files', ['name', 'path'])
    .populate('categories', 'title')
    .exec((err, dataset) => {
      if(err || !dataset) return next(err);
      
      res.json(dataset);
  });
}