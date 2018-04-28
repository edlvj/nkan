var mongoose = require('mongoose');
var licences = require('./dataset/license');
var statuses = require('./dataset/status');
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
  user: {
    type: String,
    required: true,
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


DataSetSchema.methods.licenseType = function() {
  let license = licences.find(l => l.id === this.license);
  return license;
};

DataSetSchema.methods.statusType = function() {
  let status = statuses.find(s => s.id === this.status);
  return status;
};

module.exports = mongoose.model('DataSet', DataSetSchema);