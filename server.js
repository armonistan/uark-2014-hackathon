var express = require('express');
var app = express();

var AM = require('./modules/accountManager');

app.use(express.logger('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'secret'}));
app.use(express.static(__dirname + '/public'));
app.locals.pretty = true;

app.get('/', function(req, res){
	if (req.session.loggedIn === undefined) {
		req.session.loggedIn = false;
	}
	res.render('index',
	{title : "Pork!"}
	);
});

app.post('/', function(req, res){
	if (AM.validateLogin(req.param('name'), req.param('pass'))) {
		req.session.loggedIn = true;
		req.session.name = req.param('name');
		res.redirect('/landing/' + req.param('name'));
	} else {
		res.send("Incorrect login information! <a href='/'>Home</a>");
	}
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

app.get('/signup', function(req, res){
	res.render('signup',
	{title : "Signup for Pork!"}
	);
});

app.post('/signup', function(req, res){
	if (AM.validateSignup(req.param('name'))) {
		AM.createUser(req.param('name'), req.param('pass'));
		req.session.loggedIn = true;
		req.session.name = req.param('name');
		res.redirect('/landing/' + req.param('name'));
	} else {
		res.send("Account already in use! <a href='/'>Home</a>");
	}
});

app.get('/landing/:name', function(req, res){
	if(req.session.loggedIn && req.session.name == req.params.name){
		res.render('landing',
			{name : req.params.name}
		);
	} else {
		res.send("This is not your homepage! <a href='/'>Home</a>");
	}
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});