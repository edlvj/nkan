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
  }
});

FileSchema.plugin(uniqueValidator);
module.exports = mongoose.model('File', FileSchema);
