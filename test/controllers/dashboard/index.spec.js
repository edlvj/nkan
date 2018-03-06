let mongoose = require("mongoose");

let User = require('../../../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Dashboard Controller', () => {

  describe('/GET dashboard', () => {
    it('it should GET dashboard', (done) => {
      chai.request(server)
      .get('/dashboard')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET /login', () => {
    it('it should GET login', (done) => {
      chai.request(server)
      .get('/dashboard/login')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

});	