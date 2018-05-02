var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var stringRangeValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 100],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var CategorySchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    validate: stringRangeValidator
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    validate: stringRangeValidator
  }},
  {
    timestamps: true
  }
);

CategorySchema.statics.findBySlug = function(slug) {
  return new Promise(function(resolve, reject) {
    this.findOne({
      slug: slug
    })
    .exec(function(err, category) {
      if (err) reject(err);
      resolve(category);
    });
  }.bind(this));
}

CategorySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Category', CategorySchema);