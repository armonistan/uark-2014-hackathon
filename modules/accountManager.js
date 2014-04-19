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
	fs.readdir('users', function(error, files) {
		for(var i = 0; i < files.length; i++) {
			if (files[i] == name + '.json') {
				fs.readFile('users/' + files[i], function(error, data){
					if (error) throw error;

					if(JSON.parse(data).pass == password) {
						i = files.length + 1;
						f(true);
					} else {
						i = files.length + 1;
						f(false);
					}
				});
			}
			if(i == files.length) {
				f(false);
			}
		}
	});
}

exports.createUser = function(name, password) {
	fs.writeFile('users/' + name + '.json', '{"name": "'+ name +'", "pass": "' + password + '"}', function(error){
		if(error) throw error;

		console.log("created a new user " + name);
	});
}	