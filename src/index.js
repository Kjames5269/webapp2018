const Promise = require('bluebird');
const express = require('express');
const DB = require('./database.js');
const BP = require('body-parser');

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../public/views');
app.use(express.static(__dirname + '/../public'));
app.use(BP.urlencoded({ extended: true }));

function getRandomComp() {
	return DB.getComplement().then((doc) => {
		return doc[Math.floor(Math.random()*doc.length)];	
	});
}

app.get('/', (req, res) => {
	getRandomComp().then((randomDoc) => {
		res.render('index', { message: randomDoc._id, user: randomDoc.user });
	});
});

app.post('/', (req, res) => {
	getRandomComp().then((randomDoc) => {
		var sentMsg = req.body.comment;
		const sentUsr = (req.body.user) ? req.body.user : 'anon';

		if(sentMsg.trim() == "") {
			sentMsg = "No message given :(";
		}
		else {
			DB.insertInto(sentUsr, sentMsg).catch((err) => {
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

app.listen(8080, () => {
  console.log("Listening now on port 8080!");
});
