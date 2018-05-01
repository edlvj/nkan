var mongoose = require('mongoose');
var licences = require('./dataset/license');
var statuses = require('./dataset/status');
var File = require('./dataset/file')
var Schema = mongoose.Schema;

var DataSetSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: String,
    required: true,
    ref: 'Category'
  }],
  files: [{
    type: String,
    required: true,
    ref: 'File'
  }],
  user: {
    type: String,
  //  required: true,
    ref: 'User'
  },
  status: {
    type: Number,
    required: true,
  },
  license: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    require: true
  }
},
{
  timestamps: true
});

DataSetSchema.post('remove', function(next) {
  this.files.forEach(function(item) {
    File.remove({_id: item.id}).exec();
  });

  console.log("post test");
  next();
});

DataSetSchema.methods.licenseType = function() {
  let license = licences.find(l => l.id === this.license);
  return license;
};

DataSetSchema.methods.statusType = function() {
  let status = statuses.find(s => s.id === this.status);
  return status;
};

DataSetSchema.methods.saveFiles = function(files) {
  var datasetFiles = [];

  files.forEach(function(file) {
    let datasetFile = new File({
      name: file.originalname,
      path: file.path,
      mime_type: file.mimetype,
    }).save();
    
    datasetFiles.push(datasetFile);
  });
  
  return Promise.all(datasetFiles);
};

module.exports = mongoose.model('DataSet', DataSetSchema);