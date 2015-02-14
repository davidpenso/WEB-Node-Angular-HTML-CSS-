  
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ig = require('instagram-node').instagram();
var session= require('express-session');
var r=require('request');

var user = mongoose.model('user');
var books = mongoose.model('books');
var photos = mongoose.model('photos');

var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
router.use(session(sessionOptions));



/* GET home page. */
router.get('/', function(req, res) {
	req.session.set=null;
  res.render('index', { title: 'Express' });
});
router.get('/account', function(req, res) {
	if(req.session.set){
		res.redirect('/book');
	}
  res.render('account');
});
router.get('/login', function(req, res) {
	if(req.session.set){
		res.redirect('/book');
	}
  res.render('login');
});
router.post('/account', function(req, res) {

  var us = new user({
		email: req.body.email,
		password: req.body.password
	});
	us.save(function(err, us, count) {
		req.session.set=req.body.email;
		//console.log("I am here");
		res.redirect('/book');
	});
});
router.post('/login', function(req, res) {
	//console.log("from request "+req.body.email);
 	user.find({email: req.body.email, password:req.body.password}, function(err, use, count){
 		//console.log("from server "+use);
 		if(use.length>0){
 			req.session.set=req.body.email;
 			res.redirect('/book');
 		}
 		else{
 			res.redirect('/login');
 		}
 		
	});

});



router.get('/book', function(req, res) {
	books.find(function(err, list, count) {
        res.render('book', {the_list: list,session:req.session.set});
    	});
    });
  


var api = require('instagram-node').instagram();


api.use({
  client_id: 'b90a23e50ebb4612877afdde3eeab7a1',
  client_secret: '9b29c1bb56a74e80a334545aad6fbe2b',
});





var pics=[];
var redirect_uri = 'http://localhost:3000/handleauth';


exports.authorize_user = function(req, res) {
api.use({
  client_id: 'b90a23e50ebb4612877afdde3eeab7a1',
  client_secret: '9b29c1bb56a74e80a334545aad6fbe2b',
});
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
  //console.log(res.code);
};
var showBook=function(medias,res){
	//console.log(medias);
	
	medias.forEach(function(obj){
		//console.log(obj.images.low_resolution.url);
		var pic = new photos({
			url: obj.images.low_resolution.url
		});
		pics.push(pic);
	});

	res.redirect('/photo');
};

exports.handleauth = function(req, res) {
	api.use({
  client_id: 'b90a23e50ebb4612877afdde3eeab7a1',
  client_secret: '9b29c1bb56a74e80a334545aad6fbe2b',
});
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
  	console.log(req.query.code);
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
    	access_token=result.access_token;
      	console.log('Yay! Access token is ' + result.access_token);
      //res.send('You made it');
      //res.redirect('/book');

	      api.use({
	      	access_token:result.access_token
	      });
	      api.user_self_media_recent( function(err, medias, pagination, remaining, limit) {
				//console.log(medias);
				showBook(medias,res);
		});
	     
    }
  });
};


// This is where you would initially send users to authorize
router.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
router.get('/handleauth', exports.handleauth);


router.get('/photo',function(req,res){
	res.render('photo');
})



router.post('/book/create', function(req,res) {
	var book = new books({
		name: req.body.listName,
		photos:pics
		
	});
	book.save(function(err, list, count) {
		res.redirect('/book/'+ list.slug);
	});
});

router.get('/book/:slug',function(req,res){
	if (req.params.slug == "create") {
		res.render('book');
	} else {
		books.findOne({slug: req.params.slug}, function(err, list, count) {
			 
			res.render('theBook', {listname: list.name, slug: req.params.slug,photos:list.photos});
		});
	}
});


module.exports = router;

