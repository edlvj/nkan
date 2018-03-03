var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
	DataSet.find({}).exec((err, datasets) => {
    if(err) res.send(err);
    
    res.render('dashboard/dataset', {
      datasets: datasets
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/dataset/form');
}

exports.edit = function(req, res, next) {
  DataSet.findById(req.params.id, (err, dataset) => {
    if(err) res.send(err);
    if(!dataset) res.status(404);

    res.render('dashboard/dataset/form', { dataset: dataset })
  }); 
}

exports.create = function(req, res, next) {
	var newDataSet = new DataSet(req.body);

  newDataSet.save((err, category) => {
    if(err) res.send(err);

    req.flash('success', 'Dataset created.');
    res.redirect('/dashboard/dataset');
  });
}

exports.destroy = function(req, res, next) {
}