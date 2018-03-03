var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: {
    type: String,
    unique: true,
    require: true
  },
  body: {
    type: String,
    require: true
  },
  url: {
    type: String,
    unique: true,
    require: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Page', PageSchema);