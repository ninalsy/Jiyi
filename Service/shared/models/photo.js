var mongoose = require('mongoose');
var schemaBase = require('schemaBase');

var ImageLinkSubSchema = {
	thumbnailLink: String,
	rawImageLink: String
};

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
	}
	dateTaken: {
		type: Date,
		default: Date.now
	}
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

photoSchema.path('loc').validate(function(loc) {
	if (!loc) {
		return false;
	}
	if (!loc.coordinates) {
		return false;
	}
	return (loc.coordinates.length == 2);
}, 'Photo must has a valid location');

photoSchema.path('tags').validate(function(tags) {
	return tags.length != 0;
}, 'Photo must has one or more tags');

ArticleSchema.pre('remove', function(next) {
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
			return new Error('Image cannot be null');
		}

		// var imager = new Imager(imagerConfig, 'S3');
		var self = this;

		this.validate(function(err) {
			if (err) return cb(err);
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
	load: funtion(id, cb) {
		this.findOne({
			_id: id
		}).
		populate('photographer customer').
		exec(cb);
	},

	findCloseBy: function(locationCriteria, options, cb) {
		locationCriteria.coord = locationCriteria.coord || [0, 0];
		locationCriteria.minDistance = locationCriteria.minDistance || 0;
		locationCriteria.maxDistance = locationCriteria.maxDistance || 100000;
		options.perPage = options.perPage || 1000;
		options.page = options.page || 0;
		options.permission = options.permission || 'Public'
		this.
		find(
			loc: {
				$nearSphere: locationCriteria.coord,
				$minDistance: locationCriteria.minDistance,
				$maxDistance: locationCriteria.maxDistance
			},
			permission: options.permission
		).
		limit(options.perPage).
		skip(options.page).
		populate('photographer customer').
		exec(cb);
	},

	// findByTags: function(searchTags)

}

mongoose.model('Photo', photoSchema);