var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var DataSet = require('../../models/dataset');
var Category = require('../../models/dataset/category');
var File = require('../../models/dataset/file');

var licences = require('../../models/dataset/license');
var statuses = require('../../models/dataset/status');

exports.uploadFiles = upload.array('files', 3);

exports.index = function(req, res, next) {
  DataSet.find({}).exec((err, datasets) => {
    res.render('dashboard/dataset', {
      datasets: datasets
    });
  });
}

exports.new = function(req, res, next) {
  res.render('dashboard/dataset/new', { 
    categories: res.locals.categories, 
    licences: licences,
    statuses: statuses
  });
}

exports.create = function(req, res, next) {
  let newDataSet = new DataSet(req.body);
  newDataSet.user = req.user;

  console.log(req.body);
  console.log(req.user);
  console.log(req.files);

  newDataSet.save((err, dataset) => {
    console.log(err);
    console.log(dataset);
    if(err) {
      res.render('dashboard/dataset/new', {
        categories: res.locals.categories,
        licences: [],
        statuses: [],
        err: err
      });
    } else {
      

      req.files.forEach(function(file) {
        let datasetFile = new File({
          name: file.originalname,
          path: file.path,
          mime_type: file.mimetype,
          dataset: dataset.id
        });

        datasetFile.save();
      });
      req.flash('success', req.t('dashboard.flash.created'));
      res.redirect('/dashboard/dataset');
    }
  });
}

exports.edit = function(req, res, next) {
  DataSet.findById(req.params.id, (err, dataset) => {
    res.render('dashboard/dataset/edit', { dataset: dataset });
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