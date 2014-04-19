var express = require('express');
var app = express();

var AM = require('./modules/accountManager');
var CM = require('./modules/conversationManager');

var fs = require('fs');

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
		if (!(valid === undefined)) {
			req.session.loggedIn = true;
			req.session.name = req.param('name');
			res.redirect('/landing/' + req.param('name'));
		} else {
			res.render('index',
			{title: "Pork!",
			name: req.session.name,
			error:	"Incorrect login information!"}
			);
		}
	});
});

app.get('/logout', function(req, res){
	if (req.session.loggedIn == true) {
		req.session.destroy();
		res.redirect('/');
	} else {
		res.render('index',
		{title: "Pork!",
		name: req.session.name,
		error:	"You aren't logged in!"}
		);
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
			res.render('signup',
			{title: "Pork!",
			name: req.session.name,
			error:	"Account already in use!"}
			);
		}
	});
});

app.post('/session', function(req, res) {
	CM.validateUsers(req.param('user1'), req.param('user2'), function(valid) {
		if (valid) {
			var newConvo = CM.createConversation(req.param('user1'), req.param('user2'));
			res.redirect('/session/' + newConvo);
		}
		else {
			res.send("One of the users does not exist! <a href='/landing'>Back</a>");
		}
	});
});

app.get('/landing/:name', function(req, res){
	if(req.session.loggedIn && req.session.name == req.params.name){
		res.render('landing',
			{title: "Use Pork!", name : req.params.name}
		);
	} else {
		res.render('index',
		{title: "Pork!",
		name: req.session.name,
		error:	"This is not your homepage!"}
		);
	}
});

app.get('/landing', function(req, res) {
	res.render('landing',
	{title: "Use Pork!", name: "Fucktard"}
	);
});

app.get('/session/:number', function(req, res) {
	var convoFile = CM.loadConversation(req.params.number);
	
	res.render('session',
	{title: "Learn with Pork!", convo: convoFile}
	);
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});