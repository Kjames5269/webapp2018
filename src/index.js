const Promise = require('bluebird');
const express = require('express');
const DB = require('./database.js');

var app = express();

app.get('/', (req, res) => {
	DB.getComplement().then((doc) => {
		res.send(doc);
	})
});

app.post('/', (req, res) => {
	res.send("Meee too thank");
});

app.listen(8081, () => {
  console.log("Listening now on port 8080!");
});
