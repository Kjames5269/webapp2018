const Promise = require('bluebird');
const express = require('express');

var app = express();

app.get('/', (req, res) => {
	res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Listening now on port 8080!");
});
