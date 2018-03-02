var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  body: {
    type: String
  },
  url: {
    type: String,
    unique: true
  }
},
{
  timestamps: true
});

PageSchema.statics.findAll = function() {
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

PageSchema.statics.findById = function(id) {
	return new Promise(function(resolve, reject) {
		this.findOne({
				_id: id
			})
			.exec(function(err, page) {
				if (err) reject(err);
				resolve(page);
			});
	}.bind(this));
}

PageSchema.statics.create = function(page) {
	return new Promise(function(resolve, reject) {
		this.create(page, function(err, p) {
			if (err)
				reject(err)
			resolve(p);
		});
	}.bind(this));
}

PageSchema.statics.destroyById = function(id) {
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

module.exports = mongoose.model('Page', PageSchema);