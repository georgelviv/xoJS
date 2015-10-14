var path = require('path');
var express = require('express');
var gulpConfig = require('./gulp-tasks/configuration.json');

var app = express();
var port = process.argv[2] || 3000;

app.use(express.static(gulpConfig.buildDir + '/'));

app.get('/articles', function (req, res) {
	res.sendFile(path.join('./', gulpConfig.buildDir, gulpConfig.startPoint));
});

var server = app.listen(port, function listenPort() {
	console.log('Listen on port:' + server.address().port);
});

// Socket
require('./server/socket-init')(server);
