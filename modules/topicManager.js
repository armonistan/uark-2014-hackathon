var fs = require('fs');

exports.loadTopicDatabase = function() {
	var topicFile = fs.readFileSync('public/data/topics.json');
	return JSON.parse(topicFile);
}

exports.loadTopic = function(category, topic) {
	var topics = exports.loadTopicDatabase();
	var foundTopic;
	
	for (var c = 0; c < topics.categories.length; c++) {
		if (topics.categories[c].name == category) {
			for (var t = 0; t < topics.categories[c].subtopics.length; t++) {
				if (topics.categories[c].subtopics[t].name == topic) {
					foundTopic = topics.categories[c].subtopics[t];
					break;
				}
			}
			
			if (foundTopic !== undefined) {
				break;
			}
		}
	}
	
	return foundTopic;
}