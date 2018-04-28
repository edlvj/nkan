var mongoose = require('mongoose');
let DataSet = require('../../models/dataset');
var config = require('../../config/test');

let chai = require('chai');
let should = chai.should();

describe('Dataset', function() {

  before(function(done) {
    db = mongoose.connect(config.db);
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var dataset = new DataSet({
      title: 'lorem',
      description: 'lorem ipsum',
      category: 'ipsum',
      license: 'dsds',
      user: 'dsds',
      status: 'active'
    });

    dataset.save(function(error) {
      if (error) console.log('error' + error.message);
      done();
    });
  });

  it('find a dataSet by title', function(done) {
    DataSet.findOne({ title: 'lorem' }, function(err, dataset) {
      dataset.title.should.eql('lorem');
      done();
    });
  });

  afterEach(function(done) {
    DataSet.remove({}, function() {
      done();
    });
  });
});