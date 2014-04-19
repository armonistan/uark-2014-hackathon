var fs = require('fs');
//fs.createReadStream('users');

exports.validateSignup = function(name) {
	fs.readdir('users', function(error, files) {
		for(i = 0; i < files.length; i++) {
			if (files[i] == name + '.json') {
				return false;
			}
		}
	});
	return true;
}

exports.validateLogin = function(name, password) {
	fs.readaddr('users', function(error, files) {
		for(i = 0; i < files.length; i++) {
			if (files[i] == name + '.json') {
				fs.readFile('users/' + files[i], function(error, data){
					if (error) throw error;

					if(JSON.parse(data).pass == password) {
						return true;
					} else {
						return false;
					}
				});
			}
		}
	});
	return false;
}

exports.createUser = function(name, password) {
	fs.writeFile('users/' + name + '.json', '{name: '+ name +', pass: ' + password + '}', function(error){
		if(error) throw error;

		console.log("created a new user " + name);
	});
}	