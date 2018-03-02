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

SettingSchema.statics.update = function(id, props) {
  return new Promise(function(resolve, reject) {
    this.update({
      _id: id
    }, {
      $set: props
    }).exec(function(err, numberAffected, raw) {
      if (err) {
        reject(err);
      }
      resolve(numberAffected);
    });
  }.bind(this));
}

module.exports = mongoose.model('Setting', SettingSchema);
