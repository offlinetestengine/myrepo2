//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var addr = 'mongodb://db1:root@ds011873.mlab.com:11873/offlinedb';

MongoClient.connect(addr, function (err, db) 

{
var rno="";
var sname="";
var emid="";
var AnsOpt=[];
var collection = db.collection('table2');
collection.save( { _id:rno, name: sname, email: emid, answers:AnsOpt } )
db.close();
});