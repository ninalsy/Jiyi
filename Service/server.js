/**
 * Module dependencies
 */

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('config');
var embeddedMongoDB = require('node-embedded-mongodb')
var queryBase = require('queryBase');

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

var cleanupDB = function(cb) {
	if (process.env.NODE_ENV !== 'production') {
		embeddedMongoDB.stop(function(err) {
			if (err) {
				console.log('Unable to stop mongoDB server. Error:', err);
			} else {
				console.log('Mongo DB stopped!');
			}
			cb();
		});
	} else {
		cb();
	}
}

initDB();

process.once('SIGUSR2', function() {
	cleanupDB(function() {
		process.kill(process.pid, 'SIGUSR2');
	})
});

mongoose.connection.on('error', console.log);

if (process.env.NODE_ENV === 'production') {
	mongoose.connection.on('disconnected', connect);
}

// Bootstrap app models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
	if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap shared models
fs.readdirSync(__dirname + '/shared/models').forEach(function(file) {
	if (~file.indexOf('.js')) require(__dirname + '/shared/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

var server = app.listen(port);

console.log('Express app started on port ' + port);

// Testing code

// Create photographers

var Photo = mongoose.model('Photo');

// Create photos
var createTestPhotos = function(cb) {
	var fakePhotoData = [{
		photographer: '',
		customer: '',
		tags: ['Portrait'],
		loc: {
			type: 'Points',
			coordinates: [0, 0]
		},
		imageLink: {
			thumbnailLink: '',
			rawImageLink: '',
		}
	}, {
		photographer: '',
		customer: '',
		tags: ['Family'],
		loc: {
			type: 'Points',
			coordinates: [1, 1]
		},
		imageLink: {
			thumbnailLink: '',
			rawImageLink: '',
		}
	}];

	console.log('Creating dummy photos...');

	fakePhotoData.forEach(function(item) {
		var photo = new Photo(item);
		console.log('Photo: %s', photo);
		photo.uploadAndSave('testImage', function(err, res) {
			if (err) {
				console.log('Unable to save photos. Error:', err);
			} else {
				console.log('Save suceeded. Result: %s', res);
			}
		});
	});
}

var testQuery = function() {
	var locationCriteria = queryBase.RequestLocation([1, 2], 1000000, 0);
	var options = {

	}
	console.log('Running test query...');
	Photo.findCloseBy(locationCriteria, options, function(err, res) {
		console.log('ssss');
		if (err) {
			console.log('Unable to search photos. Error:', err);
		} else {
			console.log('Search suceeded. Result: %s', res);
		}
	});
}

createTestPhotos();
testQuery();