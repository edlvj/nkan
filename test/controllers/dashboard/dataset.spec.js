let mongoose = require("mongoose");

let DataSet = require('../../../models/dataset');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Datasets Controller', () => {
  beforeEach((done) => {
    DataSet.remove({}, (err) => { 
      done();
    });
  });

  describe('/GET dashboard/dataset', () => {
    it('it should GET all the datasets', (done) => {
      chai.request(server)
      .get('/dashboard/dataset')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET dashboard/dataset/new', () => {
    it('it should GET dataset form', (done) => {
      chai.request(server)
      .get('/dashboard/dataset/new')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/POST dashboard/dataset', () => {
    it('it should create dataset', (done) => {
      let dataset = {
        title: 'lorem',
        description: 'lorem ipsum',
        category: 'ipsum',
        license: 'dsds',
        user: 'dsds',
        status: 'active'
      }
      chai.request(server)
        .post('/dashboard/dataset')
        .send(dataset)
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.req.path.should.equal('/dashboard/dataset');
          done();
        });
    });
  });

  describe('/GET dashboard/dataset/:id', () => {
    it('it should GET a dataset in by the given id', (done) => {
      let dataset = new DataSet({ 
        title: 'lorem',
        description: 'lorem ipsum',
        category: 'ipsum',
        license: 'dsds',
        user: 'dsds',
        status: 'active'
      });

      dataset.save((err, dataset) => {
        chai.request(server)
        .get('/dashboard/dataset/'+ dataset.id)
        .send(dataset)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/PUT dashboard/dataset/:id', () => {
    it('it should PUT update edit by the given id', (done) => {
      let dataset = new DataSet({
        title: 'lorem',
        description: 'lorem ipsum',
        category: 'ipsum',
        license: 'dsds',
        user: 'dsds',
        status: 'active'
      });

      dataset.save((err, dataset) => {
        chai.request(server)
        .put('/dashboard/dataset/'+ dataset.id)
        .send(dataset)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/DELETE/:id dataset', () => {
    it('it should DELETE a dataset given the id', (done) => {
      let dataset = new DataSet({
        title: 'lorem',
        description: 'lorem ipsum',
        category: 'ipsum',
        license: 'dsds',
        user: 'dsds',
        status: 'active'
      });

      dataset.save((err, dataset) => {
        chai.request(server)
        .delete('/dashboard/dataset/'+ dataset.id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });
});