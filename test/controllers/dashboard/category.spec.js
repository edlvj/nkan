let mongoose = require("mongoose");

let Category = require('../../../models/dataset/category');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Categories Controller', () => {
  beforeEach((done) => {
    Category.remove({}, (err) => { 
      done();
    });
  });

  describe('/GET dashboard/category', () => {
    it('it should GET all the categories', (done) => {
      chai.request(server)
      .get('/dashboard/category')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET dashboard/category/new', () => {
    it('it should GET category form', (done) => {
      chai.request(server)
      .get('/dashboard/category/new')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/POST dashboard/category', () => {
    it('it should create category', (done) => {
      let category = {
        title: 'test',
        url: 'test'
      }
      chai.request(server)
        .post('/dashboard/category')
        .send(category)
        .redirects(0)
        .end((err, res) => {
        	console.log(res.body);
          res.should.have.status(302);
          res.req.path.should.equal('/dashboard/category');
          done();
        });
    });
  });

  describe('/GET dashboard/category/:id', () => {
    it('it should GET a category edit by the given id', (done) => {
      let category = new Category({ title: "Rings", url: "lord" });

      category.save((err, category) => {
        chai.request(server)
        .get('/dashboard/category/'+ category.id)
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/PUT dashboard/category/:id', () => {
    it('it should PUT update edit by the given id', (done) => {
      let category = new Category({ title: "Narnia", url: "lord" });

      category.save((err, category) => {
        chai.request(server)
        .put('/dashboard/category/'+ category.id)
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/DELETE/:id category', () => {
    it('it should DELETE a category given the id', (done) => {
      let category = new Category({ title: "Narnia", url: "lord" });
      category.save((err, category) => {
        chai.request(server)
        .delete('/dashboard/category/'+ category.id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

});  