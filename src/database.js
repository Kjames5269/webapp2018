const { dbuser, pass } = require('./secret.js')
const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');

const url="mongodb://" + dbuser + ":" + pass + "@ds253587.mlab.com:53587/hackaz2018";

function base(queryFunc, docFunc) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      const col = db.collection('complements');
      const abst = queryFunc(col);
      abst((err,doc) => {
	if(err === null) {
	  if(docFunc) {
	     resolve(docFunc(doc));
	  }
          else {
             resolve(doc);
          }
        }
        else {
          reject(err);
        }
        db.close();
      });
    });
  });
}

export function getComplement() {
  return base((col) => col.find.bind(col, {}), (func) => func.toArray());
}

//export function get

export function insertInto(usr, complement) {
    return base((col) => {
	return col.insert.bind(col,
	    { 
	      "_id": complement,
	      "user": usr 
	    },
	    { "upsert": true }
	);
    })
}
