var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  path: {
    type: String,
    unique: true
  },
  mime_type: {
    type: String,
    unique: true
  },
  dataset: {
    type: String,
    required: true,
    ref: 'Dataset'
  },
});

FileSchema.plugin(uniqueValidator);
module.exports = mongoose.model('File', FileSchema);
