var express = require('express');
var app = express();
app.use(express.logger('dev'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index',
	{title : "hackathon"}
	);
});

app.get('/blarg', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});