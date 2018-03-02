var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  url: {
    type: String,
    unique: true
  }
},
{
  timestamps: true
});

CategorySchema.statics.createOne = function(category) {
  return new Promise(function(resolve, reject) {
    this.create(category, function(err, c) {
      if(err)
        reject(err);
      resolve(c);
    });
  }.bind(this));
}

CategorySchema.statics.findAll = function() {
  return new Promise(function(resolve, reject) {
    this.find({})
      .sort({
        '_id': -1
      })
      .exec(function(err, categories) {
        if(err)
          reject(err);
        resolve(categories);
      });

  }.bind(this));
}

module.exports = mongoose.model('Category', CategorySchema);