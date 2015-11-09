var mongoose = require('mongoose');
var schemaBase = require('schemaBase');

var ImageLinkSubSchema = {
	thumbnailLink: String,
	rawImageLink: String
};

var Schema = mongoose.Schema;

var photoSchema = new Schema({
	photographer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Photographer'
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer'
	},
	permission: {
		type: String,
		enum: ['Public', 'Private'],
		default: 'Public'
	},
	dateTaken: {
		type: Date,
		default: Date.now
	},
	dateUploaded: {
		type: Date,
		default: Date.now
	},
	tags: [String],
	loc: schemaBase.Location,
	imageLink: ImageLinkSubSchema
});

photoSchema.index({
	loc: '2dsphere'
});


photoSchema.path('photographer').required(true, 'Photo must has a photographer');

photoSchema.path('customer').required(true, 'Photo must has a customer');

photoSchema.path('permission').required(true, 'Photo must has a permission');

// photoSchema.path('loc').validate(function(locationInfo) {
// 	if (!locationInfo) {
// 		return false;
// 	}
// 	if (!locationInfo.coordinates) {
// 		return false;
// 	}
// 	return (locationInfo.coordinates.length == 2);
// }, 'Photo must has a valid location');

photoSchema.path('tags').validate(function(tags) {
	return tags.length != 0;
}, 'Photo must has one or more tags');

photoSchema.pre('remove', function(next) {
	// var imager = new Imager(imagerConfig, 'S3');
	// var files = this.image.files;

	// // if there are files associated with the item, remove from the cloud too
	// imager.remove(files, function (err) {
	//   if (err) return next(err);
	// }, 'article');

	next();
});

photoSchema.methods = {
	uploadAndSave: function(image, cb) {
		if (!image) {
			var err = new Error('Image cannot be null');
			cb(err);
		}

		if (!this.loc || !this.loc.coordinates || this.loc.coordinates.length != 2) {
			var err = new Error('Photo must has a valid location');
			cb(err);
		}

		// var imager = new Imager(imagerConfig, 'S3');
		var self = this;

		this.validate(function(err) {
			if (err) {
				console.log('Validation failed. Error:', err);
				return cb(err)
			};
			// imager.upload(images, function(err, cdnUri, files) {
			// 	if (err) return cb(err);
			// 	if (files.length) {
			// 		self.image = {
			// 			cdnUri: cdnUri,
			// 			files: files
			// 		};
			// 	}
			// 	self.save(cb);
			// }, 'article');
			self.save(cb);
		});
	},

}

photoSchema.statics = {
	load: function(id, cb) {
		this.findOne({
			_id: id
		}).
		populate('photographer customer').
		exec(cb);
	},

	findCloseBy: function(locationCriteria, options, cb) {
		options.perPage = options.perPage || 1000;
		options.page = options.page || 0;
		options.permission = options.permission || 'Public';
		this.
		find({
			loc: {
				$nearSphere: locationCriteria.coordinates,
				$minDistance: locationCriteria.minDistance,
				$maxDistance: locationCriteria.maxDistance
			}
		}, {
			permission: options.permission
		}).
		limit(options.perPage).
		skip(options.page).
		populate('photographer customer').
		exec(cb);
	},

	findByTags: function(searchTags, options, cb) {
		options.perPage = options.perPage || 1000;
		options.page = options.page || 0;
		options.permission = options.permission || 'Public';
		find({
			tags: {
				$elemMatch: searchTags
			}
		}, {
			permission: options.permission
		}).
		limit(options.perPage).
		skip(options.page).
		populate('photographer customer').
		exec(cb);
	}

}

mongoose.model('Photo', photoSchema);