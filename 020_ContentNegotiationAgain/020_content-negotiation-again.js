var http = require('http');

['text/plain', 'text/html', 'application/json'].forEach(function(type){
	var request = http.request({
		hostname: 'eloquentjavascript.net',
		path: '/author',
		method: 'GET',
		headers: {Accept: type}		
	}, function(response){
		response.setEncoding('utf8');
		response.on('data', function(data){
			console.log(data);
		});
	});
	request.end();
});