var mongoose = require('mongoose');
let Page = require('../../models/page');
var config = require('../../config/test');

let chai = require('chai');
let should = chai.should();

describe('Page', function() {

  before(function(done) {
    db = mongoose.connect(config.db);
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var page = new Page({
      title: 'lorem',
      body: 'lorem ipsum',
      slug: 'ipsum'
    });

    page.save(function(error) {
      if(error) console.log('error' + error.message);
      done();
    });
  });

  it('find a category by title', function(done) {
    Page.findOne({ title: 'lorem' }, function(err, page) {
      page.title.should.eql('lorem');
      done();
    });
  });

  // afterEach(function(done) {
  //   Page.remove({}, function() {
  //     done();
  //   });
  // });
});