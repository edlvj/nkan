var expect = require('chai').expect
    mongoose = require('mongoose');

describe('User', function() {
  var User;

  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/test_mocha_example');
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropDatabase();

      require('./models').registerModels();
      // This is the right model because ^registerModels set it up for us.
      User = mongoose.model('user');
      done();
    });
  });

  // afterEach(function(done) {
  //   mongoose.disconnect();
  //   done();
  // });

  // describe('Lifecycle', function() {

  //   it('should not save without password', function(done) {
  //     var user = new User({
  //       email: "alex1@alex.com"
  //     });
  //     user.save(function(err) {
  //       expect(err).to.exist
  //         .and.be.instanceof(Error)
  //         .and.have.property('message', 'user validation failed');
  //       done();
  //     });
  //   });

  // });

});