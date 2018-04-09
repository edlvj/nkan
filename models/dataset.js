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
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('DataSet', DataSetSchema);