var fs = require('fs');

exports.validateUsers = function(user1, user2, f) {
	//Make sure the users are real
	var numUsers = 0;
	
	fs.readdir('users', function(error, files) {
		for(var i = 0; i < files.length; i++) {
			if (files[i] == user1 + '.json' || files[i] == user2 + '.json') {
				numUsers++;
			}
		}
	});
	
	if (numUsers == 2) {
		//The users exist
		f(true);
	}
	else {
		f(false);
	}
}

exports.createConversation = function(user1, user2) {
	var numConversations;
	fs.readdir('convos', function(error, files) {
		numConversations = files.length;
	});
	
	var convoNumber = numConversations + 1;
	
	fs.writeFile('convos/' + convoNumber + '.json',
		'{"user1": "'+ user1 +'", "user2": "' + user2 + '", "messages": []}',
		function(error){
			if(error) {
				throw error;
			}

			console.log("created a new convo " + convoNumber);
		}
	);
	
	return convoNumber;
}

exports.loadConversation = function(number) {
	var convoFile;
	
	convoFile = JSON.parse(fs.readFileSync('convos/' + number + '.json'));
	
	console.log(convoFile);
	
	return convoFile;
}