let mongoose = require("mongoose");

let Page = require('../../../models/page');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Pages', () => {
  beforeEach((done) => {
    Page.remove({}, (err) => { 
      done();         
    });     
  });

  describe('/GET dashboard/page', () => {
    it('it should GET all the pages', (done) => {
      chai.request(server)
      .get('/dashboard/page')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/GET dashboard/page/new', () => {
    it('it should GET page form', (done) => {
      chai.request(server)
      .get('/dashboard/page/new')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('/POST dashboard/page', () => {
    it('it should create page', (done) => {
      let page = {
        title: 'test',
        body: 'test',
        url: 'url'
      }
      chai.request(server)
        .post('/dashboard/page')
        .send(page)
        .redirects(0)
        .end((err, res) => {
        	console.log(res.body);
          res.should.have.status(302);
          res.req.path.should.equal('/dashboard/page');
          done();
        });
    });
  });

  describe('/GET dashboard/page/:id', () => {
    it('it should GET a page edit by the given id', (done) => {
      let page = new Page({
        title: 'test',
        body: 'test',
        url: 'url'
      });

      page.save((err, page) => {
        chai.request(server)
        .get('/dashboard/page/'+ page.id)
        .send(page)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/PUT dashboard/page/:id', () => {
    it('it should PUT update edit by the given id', (done) => {
      let page = new Page({
        title: 'test',
        body: 'test',
        url: 'url'
      });

      page.save((err, page) => {
        chai.request(server)
        .put('/dashboard/page/'+ page.id)
        .send(page)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

  describe('/DELETE/:id dashboard/page/:id', () => {
    it('it should DELETE a page given the id', (done) => {
      let page = new Page({
        title: 'test',
        body: 'test',
        url: 'url'
      });

      page.save((err, page) => {
        chai.request(server)
        .delete('/dashboard/page/'+ page.id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
      });
    });
  });

}); 