var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var DataSet = require('../../models/dataset');
var Category = require('../../models/dataset/category');

var licences = require('../../models/dataset/license');
var statuses = require('../../models/dataset/status');

exports.uploadFiles = upload.array('files', 3);

exports.index = function(req, res, next) {
  DataSet.find({})
    .populate('categories')
    .populate('files')
    .exec((err, datasets) => {
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

  newDataSet.saveFiles(req.files).then(data => {
    newDataSet.files = data.map(function(file) {
      return file._id;
    });

    newDataSet.save((err, dataset) => {
      if(err) {
        res.render('dashboard/dataset/new', {
          categories: res.locals.categories,
          licences: [],
          statuses: [],
          err: err
        });
      } else { 
        req.flash('success', req.t('dashboard.flash.created'));
        res.redirect('/dashboard/dataset');
      }
    });
  }).catch(err =>{
    req.flash('error', err.message);
  });
}

exports.edit = function(req, res, next) {
  DataSet.findById(req.params.id, (err, dataset) => {
    res.render('dashboard/dataset/edit', { 
      dataset: dataset,
      licences: licences,
      statuses: statuses 
    });
  }).populate('files'); 
}

exports.delete = function(req, res, next) {
	DataSet.findById(req.params.id, (err, page) => {
    DataSet.remove({_id: req.params.id}, (err, dataset) => {
      req.flash('success', req.t('dashboard.flash.deleted'));
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
      req.flash('success', req.t('dashboard.flash.updated'));
      res.redirect('/dashboard/category');
    }); 
  });
}