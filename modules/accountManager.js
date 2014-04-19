var fs = require('fs');
//fs.createReadStream('users');

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
		console.log(i + " files len " + files.length)
		if (files[i] == name + '.json') {
			data = fs.readFileSync('users/' + files[i]);
			if(JSON.parse(data).pass == password) {
				console.log(JSON.parse(data).pass + " and entered was " + password)
				returned = "yeah you're cool";
			} else {
				console.log(JSON.parse(data).pass + " and entered was " + password)
			}
		}
	}
	f(returned);
}

exports.createUser = function(name, password) {
	fs.writeFile('users/' + name + '.json', '{"name": "'+ name +'", "pass": "' + password + '"}', function(error){
		if(error) throw error;

		console.log("created a new user " + name);
	});
}
