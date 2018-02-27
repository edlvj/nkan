module.exports = function(req, res, next) {
  if(req.user) {
	next();
  } else {

  	next();
  	// if(req.url === '/login') {
	  // next();
   //  } else {
	  // res.redirect('/dashboard');
   //  }
	//res.redirect('');
  }
}