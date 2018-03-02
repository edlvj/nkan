
exports.index = function(req, res, next) {
  res.render('dashboard/dataset');
}

exports.new = function(req, res, next) {
  res.render('dashboard/dataset/form');
}

exports.create = function(req, res, next) {
}

exports.destroy = function(req, res, next) {
}

