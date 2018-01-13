'use strict';

var Promise = require('bluebird');
var express = require('express');
var DB = require('./database.js');

var app = express();

app.get('/', function (req, res) {
	DB.getComplement().then(function (doc) {
		res.send(doc[Math.floor(Math.random() * doc.length)]);
	});
});

app.post('/', function (req, res) {
	res.send("Meee too thank");
});

app.listen(8081, function () {
	console.log("Listening now on port 8081!");
});