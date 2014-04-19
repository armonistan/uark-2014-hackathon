var fs = require('fs');

exports.addKarma = function(name, amount) {
	var files = fs.readdirSync('users');
	var i = 0;
	for(i = 0; i < files.length + 1; i++) {
		if (files[i] == name + '.json') {
			data = fs.readFileSync('users/' + files[i]);
			var user = JSON.parse(data);
			user.karma += amount;
			fs.writeFileSync('users/' + files[i], JSON.stringify(user));
		}
	}
}

exports.findMatches = function(category, topic, cb) {
	var matches;
	var match;
	var datab = fs.readFileSync('public/data/topics.json');
	var topics = JSON.parse(datab);
	for (var i = 0; i < topics.categories.length; i++) {
		if (topics.categories[i].name == category) {
			var subTopics = topics.categories[i].subtopics;
			for (var j = 0; j < subTopics.length; j++) {
				if(subTopics[j].name == topic) {
					matches = subTopics[j].canHelp;
					break;
				}
			}
		}
	}
	if (matches === undefined || matches == null || matches == []) {
		cb(null)
	} else {
		var files = fs.readdirSync('users');
		console.log(matches);
		for (var k = 0; k < files.length; k++) {
			data = fs.readFileSync('users/' + files[k]);
			var user = JSON.parse(data);
			if (k == 0 && matches.indexOf(user.name) != -1) {
				match = user;
			} else if (matches.indexOf(user.name) != -1){
				match = user;
			}
		}

		cb(match);
	}
}