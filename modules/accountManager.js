var fs = require('fs');

exports.validateSignup = function(name, f) {
	fs.readdir('users', function(error, files) {
		for(var i = 0; i < files.length; i++) {
			if (files[i] == name + '.json') {
				i = files.length + 1;
				f(false);
			}
		}
		if (i == files.length) {
			f(true);
		}
	});
}

exports.validateLogin = function(name, password, f) {
	var files = fs.readdirSync('users')
	var i = 0;
	var returned;
	for(i = 0; i < files.length + 1; i++) {
		if (files[i] == name + '.json') {
			data = fs.readFileSync('users/' + files[i]);
			if(JSON.parse(data).pass == password) {
				returned = "yeah you're cool";
			}
		}
	}
	f(returned);
}

exports.createUser = function(name, password) {
	fs.writeFile('users/' + name + '.json', '{"name": "'+ name +'", "pass": "' + password + '", "karma" : "10"}', function(error){
		if(error) throw error;

		console.log("created a new user " + name);
	});
}

exports.addCoversationToUser = function(name, sessionNum, otherName, topic) {
	var user;
	var files = fs.readdirSync('users');
	for(var i = 0; i < files.length + 1; i++) {
		if (files[i] == name + '.json') {
			var data = fs.readFileSync('users/' + files[i])
			user = JSON.parse(data);
			if(user.activeSessions == null)
				user.activeSessions = ([[sessionNum, otherName, topic]]);
			else{
				user.activeSessions.push([sessionNum, otherName, topic]);
			}
			console.log([name, sessionNum, otherName, topic]);
			fs.writeFileSync('users/' + name + '.json', JSON.stringify(user));
		}
	}
}

exports.getUser = function(name){
	var user;
	var files = fs.readdirSync('users');
	for(var i = 0; i < files.length + 1; i++) {
		if (files[i] == name + '.json') {
			var data = fs.readFileSync('users/' + files[i])
			user = JSON.parse(data);
		}
	}
	
	return user;
}
