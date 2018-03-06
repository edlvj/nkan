var mongoose = require('mongoose');
let Category = require('../../../models/dataset/category');
var config = require('../../../config/test');

let chai = require('chai');
let should = chai.should();

describe('Category', function() {
  before(function(done) {
    db = mongoose.connect(config.db);
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var category = new Category({
      title: 'lorem',
      slug: 'ipsum'
    });

    category.save(function(error) {
      if (error) console.log('error' + error.message);
      done();
    });
  });

  it('find a category by title', function(done) {
    Category.findOne({ title: 'lorem' }, function(err, category) {
      category.title.should.eql('lorem');
      done();
    });
  });

  it('should be invalid if title and slug is empty', function(done) {
      var c = new Category();

      c.validate(function(err) {
        err.errors.title.should.to.exist;
        err.errors.slug.should.to.exist;
        done();
      });
  });

  afterEach(function(done) {
    Category.remove({}, function() {
      done();
    });
  });

});