var mongoose = require('mongoose');

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

module.exports = mongoose.model('File', FileSchema);
