var Category = require('../../models/dataset/category');

exports.index = function(req, res, next) {
  var perPage = 10;
  var page = req.query.page || 1;

  Category
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, categories) => {
      if(err) return next(err);
      var pagination = {
        pagination: {
          current: page,
          pages: Math.ceil((categories.length + 1) / perPage)
        }
      };

      var data = Object.assign({}, categories, pagination);
      res.json(data);
  });
}
