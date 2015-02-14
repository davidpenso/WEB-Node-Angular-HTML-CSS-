var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');



var user = new mongoose.Schema({
	email:String,
	password:String
	
});

var photos = new mongoose.Schema({
	url:String,
	
});


var books = new mongoose.Schema({
	name: String,
	photos:[photos],
}); 

books.plugin(URLSlugs('name'));


mongoose.model('books', books);
mongoose.model('photos', photos);
mongoose.model('user', user);



mongoose.connect('mongodb://localhost/flashbackdb');