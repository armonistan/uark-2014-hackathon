var fs = require('fs');

exports.setSettings = function(name, req) {
	var user;
	var file = fs.readFileSync('users/' + name +'.json');
	var topicsFile = fs.readFileSync('public/data/topics.json');
	var topics = JSON.parse(topicsFile);
	
	user = JSON.parse(file);
	user.settings = {};
	user.settings.can = [];
	user.settings.need = [];

	var num = 0;
	for (var c = 0; c < topics.categories.length; c++) {
		for (var t = 0; t < topics.categories[c].subtopics.length; t++) {
			var can = 'can_' + num;
			var need = 'need_' + num;

			if (req.body[can] !== undefined) {
				user.settings.can[user.settings.can.length] = topics.categories[c].subtopics[t].name;
				
				if (topics.categories[c].subtopics[t].canHelp.indexOf(name) == -1) {
					topics.categories[c].subtopics[t].canHelp.push(name);
				}
			}
			else {
				var userIndex = topics.categories[c].subtopics[t].canHelp.indexOf(name);
				
				if (userIndex != -1) {
					topics.categories[c].subtopics[t].canHelp.splice(userIndex, 1);
				}
			}
			
			if (req.body[need] !== undefined) {
				user.settings.need[user.settings.need.length] = topics.categories[c].subtopics[t].name;
				
				if (topics.categories[c].subtopics[t].needsHelp.indexOf(name) == -1) {
					topics.categories[c].subtopics[t].needsHelp.push(name);
				}
			}
			else {
				var userIndex = topics.categories[c].subtopics[t].needsHelp.indexOf(name);
				
				if (userIndex != -1) {
					topics.categories[c].subtopics[t].needsHelp.splice(userIndex, 1);
				}
			}
			
			num++;
		}
	}
	
	//console.log('The ' + user.settings + ' was appended to file!');
	fs.writeFileSync('users/' + name + '.json', JSON.stringify(user));
	fs.writeFileSync('public/data/topics.json', JSON.stringify(topics));
}