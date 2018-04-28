var mongoose = require('mongoose');
var User = require('../../models/user');
var config = require('../../config/test');

let chai = require('chai');
let should = chai.should();

describe('User', function() {
  before(function(done) {
    db = mongoose.connect(config.db);
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var user = new User({
      email: 'test@test.com',
      password: 'lorem_ipsum',
      admin: true
    });

    user.save(function(error) {
      if(error) console.log('error' + error.message);
      done();
    });
  });

  it('find a user by title', function(done) {
    User.findOne({ email: 'test@test.com' }, function(err, user) {
      //console.log(user);
      user.email.should.eql('test@test.com');
      done();
    });
  });

  // it('generate hash for password', function(done) {
  //   User.findOne({ email: 'test@test.com' }, function(err, user) {
  //     user.generateHash('1234').should.to.be.a('string');
  //     done();
  //   });
  // });

  // afterEach(function(done) {
  //   User.remove({}, function() {
  //     done();
  //   });
  // });
});