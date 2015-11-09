
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var userPlugin = require('mongoose-user');
var schemaBase = require('schemaBase');
var Schema = mongoose.Schema;

/**
 * photographer schema
 */

var PhotographerSchema = new Schema({
  name: String,
  email: {type: String, default: ''},
  phones: [{label: String, number: String}],
  userName: String,
  hashed_password: { type: String, default: '' },
  curLoc: schemaBase.Location,
  workAddress: schemaBase.Address,
  //@TODO: Schedule
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
  samplePhotos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]

});

PhotographerSchema.index({ curLoc : '2dsphere' });

/**
 * User plugin
 */

PhotographerSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PhotographerSchema.method({

});

/**
 * Statics
 */

PhotographerSchema.statics.findNearByPhotographers = function(requestLocation, cb) {
	this.find().where('loc').near({
		center: {
			type: 'Point',
			coordinates: requestLocation.coordinates
		},
		maxDistance: requestLocation.maxDistance || 50000
	}).exec(cb);
}

PhotographerSchema.statics.findPhotographers = function(req, cb) {
	
	if (req.userName) {
		return this.find({ userName: new RegExp(req.userName, 'i') }, cb);
	}

	if (req.name) {
		return this.find({ name: new RegExp(req.name, 'i'), cb});
	}

	if (req.email) {
		return this.find({ email: new RegExp(req.email, 'i'), cb});
	}

	if (req.phone) {
		return this.find({phones: {$elemMatch: req.phone}}, cb);
	}

	return [];
	
}

/**
 * Register
 */

mongoose.model('Photographer', PhotographerSchema);
