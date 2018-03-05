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

exports.delete = function(req, res, next) {
	DataSet.findById(req.params.id, (err, page) => {
    if(err) res.send(err);
    if(!page) res.status(404);

    DataSet.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'DataSet destroyed.');
      res.redirect('back');
    });
  });
}

exports.update = function(req, res, next) {
  DataSet.findById({_id: req.params.id}, (err, dataset) => {
    if(err) res.send(err);
    if(!dataset) res.status(404);

    Object.assign(dataset, req.body).save((err, dataset) => {
      if(err) {
        req.flash('warning', 'Something went wrong.');
      }
      req.flash('success', 'Dataset updated.');
      res.redirect('/dashboard/category');
    }); 
  });
}