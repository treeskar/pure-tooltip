var express = require('express'),
	app = express(),
	debug = true;

if(debug){
	// Get source map
	app.get(/js\/(static|bower_components)(.+)/, function(req,res){
		res.sendfile(req.params[0]+'/'+req.params[1]);
	});
}

app.get('*', function(req,res){
	var file = 'build/index.html';
	if(/.*\.(html|js|css|png|jpg|gif)$/.test(req.originalUrl)){
		file = 'build/'+req.originalUrl.substr(1, req.originalUrl.length);
	}
	res.sendfile(file);
});

var port = process.env.PORT || 7000;
app.listen(port);