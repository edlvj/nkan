var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var validate = require('mongoose-validator');
var passportLocalMongoose = require('passport-local-mongoose');

var passwordRangeValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 12],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters',
  })
];

var UserSchema = new mongoose.Schema({
  email: {
  	type: String,
    unique: true,
    require: true
  },	
  password: {
  	type: String,
    require: true,
    validate: passwordRangeValidator
  },
  admin: {
  	type:Boolean,
  	require: true, 
  	default: false
  }	
},
{
  timestamps: true
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);