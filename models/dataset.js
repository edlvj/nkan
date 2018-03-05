var mongoose = require('mongoose');
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
  category: {
    type: String,
    required: true,
    ref: 'Category'
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    ref: 'User'
  },
  license: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('DataSet', DataSetSchema);