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
	
	console.log(topics);
	
	var num = 0;
	for (var c = 0; c < topics.categories.length; c++) {
		for (var t = 0; t < topics.categories[c].subtopics.length; t++) {
			var can = 'can_' + num;
			var need = 'need_' + num;
			
			console.log(req.body[can] + ', ' + req.body[need]);
			
			if (req.body[can] !== undefined) {
				user.settings.can[user.settings.can.length] = topics.categories[c].subtopics[t].name;
				topics.categories[c].subtopics[t].canHelp[topics.categories[c].subtopics[t].canHelp.length] = name;
			}
			
			if (req.body[need] !== undefined) {
				user.settings.need[user.settings.need.length] = topics.categories[c].subtopics[t].name;
				topics.categories[c].subtopics[t].needsHelp[topics.categories[c].subtopics[t].needsHelp.length] = name;
			}
			
			num++;
		}
	}
	
	//console.log('The ' + user.settings + ' was appended to file!');
	fs.writeFileSync('users/' + name + '.json', JSON.stringify(user));
	fs.writeFileSync('public/data/topics.json', JSON.stringify(topics));
}