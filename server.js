'use strict';

var http = require('http');

var server = http.createServer(function(req, res) {
	var url = req.url;
	if (url === '/time') {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		var date = new Date();
		res.write(JSON.stringify({time: date.toISOString()}));
		res.end();
	} else if (url === '/greet') {
		if (req.method === 'POST') {
			req.on('data', function(data) {
				var name = (JSON.parse(data.toString('utf-8'))).name;
				res.writeHead(200, {
					'Content-Type': 'application/json'
				});
				res.write(JSON.stringify({message: 'Hello ' + name}));
				res.end();
			});
		} else {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify({message: 'Hello World'}));
			res.end();
		}
	} else if (url.indexOf('/greet/') !== -1) {
		var name = url.slice(7);
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.write(JSON.stringify({message: 'Hello ' + name}));
		res.end();
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});
		res.write(JSON.stringify({message: 'Page Not Found'}));
		res.end();
	}
});

server.listen(4444, function() {
	console.log('server started');
});