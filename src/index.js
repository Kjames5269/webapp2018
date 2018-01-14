const Promise = require('bluebird');
const express = require('express');
const DB = require('./database.js');

var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/../public/views');
app.use(express.static(__dirname + '/../public'));

function getRandomComp() {
	return DB.getComplement().then((doc) => {
		return doc[Math.floor(Math.random()*doc.length)];	
	});
}

app.get('/', (req, res) => {
	getRandomComp().then((randomDoc) => {
		res.render('index', { message: randomDoc.quote, user: randomDoc.user });
	});
});

app.post('/', (req, res) => {
	getRandomComp().then((randomDoc) => {
		const sentMsg = req.body.message;
		if(sentMsg == null) {
			res.send("No message given :(");
		}
		const sentUsr = req.body.user | 'anon';
		res.render('thanks', { 
					message: randomDoc.quote, 
					user: randomDoc.user, 
					sentMsg: sentMsg, 
					sentUsr: sentUsr 
				     });
	});
});

app.listen(8080, () => {
  console.log("Listening now on port 8080!");
});
