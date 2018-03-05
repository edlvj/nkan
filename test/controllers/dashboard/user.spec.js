let mongoose = require("mongoose");

let User = require('../../../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => { 
      done();         
    });     
  });

  describe('/GET dashboard/user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
      .get('/dashboard/user')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET dashboard/user/new', () => {
    it('it should GET page form', (done) => {
      chai.request(server)
      .get('/dashboard/user/new')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/POST dashboard/user', () => {
    it('it should create user', (done) => {
      let user = {
        email: 'test@test.com',
        password: 'test',
        admin: false
      }
      chai.request(server)
        .post('/dashboard/user')
        .send(user)
        .redirects(0)
        .end((err, res) => {
        	console.log(res.body);
          res.should.have.status(302);
          res.req.path.should.equal('/dashboard/user');
          done();
        });
    });
  });

  describe('/GET dashboard/user/:id', () => {
    it('it should GET a user edit by the given id', (done) => {
      let user = new User({
        email: 'test@test.com',
        password: 'test',
        admin: false
      });

      user.save((err, user) => {
        chai.request(server)
        .get('/dashboard/user/'+ user.id)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  // describe('/PUT dashboard/user/:id', () => {
  //   it('it should PUT update by the given id', (done) => {
  //     let user = new User({
  //       email: 'test@test.com',
  //       password: 'test',
  //       admin: false
  //     });

  //   //  console.log(user);

  //     user.save((err, user) => {
  //     //	console.log(user.id);
  //       chai.request(server)
  //       .put('/dashboard/user/'+ user.id)
  //       .send(user)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //     });
  //   });
  // });

  describe('/DELETE/:id dashboard/user/:id', () => {
    it('it should DELETE a user given the id', (done) => {
      let user = new User({
        email: 'test@test.com',
        password: 'test',
        admin: false
      });

      user.save((err, user) => {
        chai.request(server)
        .delete('/dashboard/user/'+ user.id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

});	