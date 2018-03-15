var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
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
  slug: {
    type: String,
    unique: true,
    require: true
  }
},
{
  timestamps: true
});

PageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Page', PageSchema);