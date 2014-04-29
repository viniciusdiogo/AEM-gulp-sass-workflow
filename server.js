var http = require('http');
var fs = require('fs');

fs.readFile('dev/index.html', function (err, html) {
	if (err) {
		throw err; 
	}
	http.createServer(function(req, res) {
		if (req.url.length === 1) {
			res.writeHeader(200, {"Content-Type": "text/html"});  
			res.write(html);
			res.end();
			console.log('request made');
		}
	}).listen(8080);
});