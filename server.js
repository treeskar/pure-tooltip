var express = require('express');
var app = express();

app.get('*', function(req,res){
	var file = 'build/index.html';
	if(/.*\.(html|js|css|png|jpg|gif)$/.test(req.originalUrl)){
		file = 'build/'+req.originalUrl.substr(1, req.originalUrl.length);
	}
	res.sendfile(file);
});

var port = process.env.PORT || 7000;
app.listen(port);