var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  template: {
    type: String,
    unique: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Setting', SettingSchema);
