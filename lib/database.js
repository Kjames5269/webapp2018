'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComplement = getComplement;
exports.insertInto = insertInto;

var _require = require('./secret.js'),
    dbuser = _require.dbuser,
    pass = _require.pass;

var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

var url = "mongodb://" + dbuser + ":" + pass + "@ds253587.mlab.com:53587/hackaz2018";

function base(queryFunc, docFunc) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      var col = db.collection('complements');
      var abst = queryFunc(col);
      abst(function (err, doc) {
        if (err === null) {
          if (docFunc) {
            resolve(docFunc(doc));
          } else {
            resolve(doc);
          }
        } else {
          reject(err);
        }
        db.close();
      });
    });
  });
}

function getComplement() {
  return base(function (col) {
    return col.find.bind(col, {});
  }, function (func) {
    return func.toArray();
  });
}

//export function get

function insertInto(usr, complement) {
  return base(function (col) {
    return col.findOneAndUpadate.bind(col, {
      "quote": complement,
      "user": usr
    }, { "upsert": true });
  });
}