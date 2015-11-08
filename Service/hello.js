//Lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var embeddedMongoDB = require('node-embedded-mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var dbPath = './data/db/';
var logPath = './data/logs/mongod.log';


//Start MongoDB
embeddedMongoDB.start(dbPath, logPath, function(err) {
	if (err) {
		console.log('Unable to start mongoDB server. Error:', err);
	} else {
		console.log('Mongo DB started!');
	}
});

//Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/test_db_name';

//Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.

		//Close connection
		db.close();

		//Stop MongoDB
		embeddedMongoDB.stop(function(err) {
			if (err) {
				console.log('Unable to stop mongoDB server. Error:', err);
			} else {
				console.log('Mongo DB stopped!');
			}
		});
	}
});