var fs = require('fs');

exports.validateUsers = function(user1, user2, f) {
	//Make sure the users are real
	var numUsers = 0;
	
	console.log(user1);
	
	var files = fs.readdirSync('users');
	
	for(var i = 0; i < files.length; i++) {
		if (files[i] == user1 + '.json' || files[i] == user2 + '.json') {
			numUsers++;
			
			console.log("Found" + files[i] + numUsers);
		}
	}
	
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
	var files = fs.readdirSync('convos');
	
	var convoNumber = files.length + 1;
	
	fs.writeFile('convos/' + convoNumber + '.json',
		'{"users": ["' + user1 +'", "' + user2 + '"], "messages": []}',
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

	return convoFile;
}