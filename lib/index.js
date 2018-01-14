'use strict';

var Promise = require('bluebird');
var express = require('express');
var DB = require('./database.js');
var BP = require('body-parser');

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../public/views');
app.use(express.static(__dirname + '/../public'));
app.use(BP.urlencoded({ extended: true }));

function getRandomComp() {
	return DB.getComplement().then(function (doc) {
		return doc[Math.floor(Math.random() * doc.length)];
	});
}

app.get('/', function (req, res) {
	getRandomComp().then(function (randomDoc) {
		res.render('index', { message: randomDoc._id, user: randomDoc.user });
	});
});

app.post('/', function (req, res) {
	getRandomComp().then(function (randomDoc) {
		var sentMsg = req.body.comment;
		if (sentMsg.length > 90) {
			sentMsg = sentMsg.substring(0, 90);
		}
		var sentUsr = req.body.user || req.body.user.length > 30 ? req.body.user : 'anon';

		if (sentMsg.trim() == "") {
			sentMsg = "No message given :(";
		} else {
			DB.insertInto(sentUsr, sentMsg).catch(function (err) {
				// pass
			});
		}
		res.render('index', {
			message: sentMsg, //randomDoc._id,
			user: sentUsr, //randomDoc.user,
			sentMsg: sentMsg,
			sentUsr: sentUsr
		});
	});
});

app.listen(8080, function () {
	console.log("Listening now on port 8080!");
});