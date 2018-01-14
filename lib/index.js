'use strict';

var Promise = require('bluebird');
var express = require('express');
var DB = require('./database.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../public/views');
app.use(express.static(__dirname + '/../public'));

function getRandomComp() {
	return DB.getComplement().then(function (doc) {
		return doc[Math.floor(Math.random() * doc.length)];
	});
}

app.get('/', function (req, res) {
	getRandomComp().then(function (randomDoc) {
		res.render('index', { message: randomDoc.quote, user: randomDoc.user });
	});
});

app.post('/', function (req, res) {
	getRandomComp().then(function (randomDoc) {
		var sentMsg = req.body.message;
		if (sentMsg == null) {
			res.send("No message given :(");
		}
		var sentUsr = req.body.user | 'anon';
		res.render('thanks', {
			message: randomDoc.quote,
			user: randomDoc.user,
			sentMsg: sentMsg,
			sentUsr: sentUsr
		});
	});
});

app.listen(8080, function () {
	console.log("Listening now on port 8080!");
});