var express = require('express');
var app = express();

var AM = require('./modules/accountManager');
var SM = require('./modules/settingsManager');

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
	{title : "Pork!",
	name: req.session.name}
	);
});

app.post('/', function(req, res){
	AM.validateLogin(req.param('name'), req.param('pass'), function(valid) {
		console.log(valid);
		if (valid) {
			req.session.loggedIn = true;
			req.session.name = req.param('name');
			res.redirect('/landing/' + req.param('name'));
		} else {
			res.send("Incorrect login information! <a href='/'>Home</a>");
		}
	});
});

app.get('/logout', function(req, res){
	if (req.session.loggedIn == true) {
		req.session.destroy();
		res.redirect('/');
	} else {
		res.send("Not logged in! <a href'/'>Home</a>");
	}
});

app.get('/help', function(req, res){
	res.render('help',
	{title : "Help with Pork!",
	name : req.session.name}
	);
});

app.get('/signup', function(req, res){
	res.render('signup',
	{title : "Signup for Pork!",
	name : req.session.name}
	);
});

app.get('/about', function(req, res){
	res.render('about',
	{title : "About Pork!",
	name: req.session.name}
	);
});

app.get('/signup', function(req, res){
	res.render('signup',
	{title : "Signup for Pork!",
	name: req.session.name}
	);
});

app.post('/signup', function(req, res){
	AM.validateSignup(req.param('name'), function(valid) {
		if (valid) {
			AM.createUser(req.param('name'), req.param('pass'));
			req.session.loggedIn = true;
			req.session.name = req.param('name');
			res.redirect('/landing/' + req.param('name'));
		} else {
			res.send("Account already in use! <a href='/'>Home</a>");
		}
	});
});

app.get('/landing/:name', function(req, res){
	if(req.session.loggedIn && req.session.name == req.params.name){
		res.render('landing',
			{title: "Use Pork!", name : req.params.name}
		);
	} else {
		res.send("This is not your homepage! <a href='/'>Home</a>");
	}
});

app.post('/settings/:name', function(req, res){
	SM.setSettings(req.param('name'), (req.body.fack));
	res.redirect('/landing/' + req.param('name'));
});

app.get('/settings/:name', function(req, res){
	if(req.session.loggedIn && req.session.name == req.params.name){
		res.render('settings',
			{title: "Pork! Settings", name : req.params.name}
		);
	} else {
		res.send("This is not your homepage! <a href='/'>Home</a>");
	}
});

app.get('/landing', function(req, res) {
	res.render('landing',
	{title: "Use Pork!", name: "Fucktard"}
	);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});