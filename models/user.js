var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  email: String,
  password: String,
  admin: Boolean, default: false
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

UserSchema.statics.findAll = function() {
  return new Promise(function(resolve, reject) {
    this.find({})
      .sort({
        '_id': -1
      })
      .exec(function(err, pages) {
        if(err)
          reject(err);
        resolve(pages);
      });

  }.bind(this));
}

UserSchema.statics.findById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				_id: id
			})
			.exec(function(err, user) {
				if (err) reject(err);
				resolve(user);
			});
	}.bind(this));
}

UserSchema.statics.destroyById = function(id) {
	return new Promise(function(resolve, reject) {
		this.remove({
			_id: id
		}, function(err, p) {
			if (err)
				reject(err)
			resolve(p);
		});
	}.bind(this));
}

UserSchema.statics.create = function(user) {
	user.password = user.generateHash(user.password);
	return new Promise(function(resolve, reject) {
		this.create(user, function(err, p) {
			if (err)
				reject(err)
			resolve(p);
		});
	}.bind(this));
}

UserSchema.statics.updateById = function(id, props) {
	//user.password = user.generateHash(params[password]);
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

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);