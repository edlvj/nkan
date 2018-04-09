var DataSet = require('../../models/dataset');

exports.index = function(req, res, next) {
  DataSet.find({}).exec((err, datasets) => {

    res.render('dashboard/dataset', {
      datasets: datasets
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/dataset/new');
}

exports.edit = function(req, res, next) {
  DataSet.findById(req.params.id, (err, dataset) => {

    res.render('dashboard/dataset/edit', { dataset: dataset })
  }); 
}

exports.create = function(req, res, next) {
  var newDataSet = new DataSet(req.body);

  newDataSet.save((err, category) => {
    req.flash('success', 'Dataset created.');
    res.redirect('/dashboard/dataset');
  });
}

exports.delete = function(req, res, next) {
	DataSet.findById(req.params.id, (err, page) => {

    DataSet.remove({_id : req.params.id}, (err, result) => {
      req.flash('success', 'DataSet destroyed.');
      res.redirect('back');
    });
  });
}

exports.update = function(req, res, next) {
  DataSet.findById({_id: req.params.id}, (err, dataset) => {

    Object.assign(dataset, req.body).save((err, dataset) => {
      if(err) {
        req.flash('warning', 'Something went wrong.');
      }
      req.flash('success', 'Dataset updated.');
      res.redirect('/dashboard/category');
    }); 
  });
}