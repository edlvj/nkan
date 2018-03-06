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
        slug: 'test'
      }
      chai.request(server)
        .post('/dashboard/category')
        .send(category)
        .redirects(0)
        .end((err, res) => {
          res.should.have.status(302);
          res.req.path.should.equal('/dashboard/category');
          done();
        });
    });

    it('it should return validation messages', (done) => {
      chai.request(server)
        .post('/dashboard/category')
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET dashboard/category/:id', () => {
    it('it should GET a category edit by the given id', (done) => {
      let category = new Category({
        title: "Rings", 
        slug: "lord" 
      });

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

    it('it should return 500 for category by the given id', (done) => {
      chai.request(server)
        .get('/dashboard/category/not_listed')
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it('it should return 404 for category by the given id', (done) => {
      let object_id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

      chai.request(server)
        .get('/dashboard/category/' + object_id)
        .send({})
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/PUT dashboard/category/:id', () => {
    let category = new Category({ 
      title: "Narnia", 
      slug: "lord" 
    });

    it('it should PUT update edit by the given id', (done) => {
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
    
    //i'm here
    // it('it should return 500 for category by the given id', (done) => {
    //   chai.request(server)
    //     .get('/dashboard/category/'+ category.id)
    //     .send({})
    //     .end((err, res) => {
    //       res.should.have.status(500);
    //       done();
    //     });
    // });
  });

  describe('/DELETE/:id category', () => {
    it('it should DELETE a category given the id', (done) => {
      let category = new Category({
       title: "Narnia", 
       slug: "lord" 
     });
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