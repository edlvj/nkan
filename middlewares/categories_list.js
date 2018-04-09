var Category = require('../models/dataset/category');

module.exports = function(req, res, next) {
  Category.find({}).exec((err, categories) => {
    console.log(categories);
    res.locals.categories = categories;
    next();
  });
}