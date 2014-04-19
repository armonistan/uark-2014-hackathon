var express = require('express');
var app = express();
app.use(express.logger('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.locals.pretty = true;

app.get('/', function(req, res){
	res.render('index',
	{title : "Pork!"}
	);
});

app.get('/help', function(req, res){
	res.render('help',
	{title : "Help with Pork!"}
	);
});

app.get('/signup', function(req, res){
	res.render('signup',
	{title : "Signup for Pork!"}
	);
});

app.get('/about', function(req, res){
	res.render('about',
	{title : "About Pork!"}
	);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});