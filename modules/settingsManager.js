var fs = require('fs');

exports.setSettings = function(name, settings) {
	console.log(settings);
	var user;
	var files = fs.readdirSync('users');
	for(var i = 0; i < files.length + 1; i++) {
		if (files[i] == name + '.json') {
			var data = fs.readFileSync('users/' + files[i])
			user = JSON.parse(data);
			user.settings = settings;
			console.log('The '+ settings +' was appended to file!');
			fs.writeFileSync('users/' + name + '.json', JSON.stringify(user));
		}
	}
}