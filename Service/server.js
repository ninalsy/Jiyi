/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var embeddedMongoDB = require('node-embedded-mongodb')

var app = express();
var port = process.env.PORT || 3000;

// Connect to mongodb
var connect = function() {
	var options = {
		server: {
			socketOptions: {
				keepAlive: 0
			}
		}
	};
	mongoose.connect(config.dbName, options);
};

var initDB = function() {
	if (process.env.NODE_ENV !== 'production') {
		embeddedMongoDB.start(config.dbPath, config.dbLogPath, function(err) {
			if (err) {
				console.log('Unable to start mongoDB server. Error:', err);
			} else {
				console.log('Mongo DB started!');
				connect();
			}
		});
	} else {
		connect();
	}
}

var cleanupDB = function(callback) {
	if (process.env.NODE_ENV !== 'production') {
		embeddedMongoDB.stop(function(err) {
			if (err) {
				console.log('Unable to stop mongoDB server. Error:', err);
			} else {
				console.log('Mongo DB stopped!');
			}
			callback();
		});
	} else {
		callback();
	}
}

initDB();

mongoose.connection.on('error', console.log);

if (process.env.NODE_ENV === 'production') {
	mongoose.connection.on('disconnected', connect);
}

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
	if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

var server = app.listen(port);

console.log('Express app started on port ' + port);

process.once('SIGUSR2', function() {
	cleanupDB(function() {
		process.kill(process.pid, 'SIGUSR2');
	})
});
