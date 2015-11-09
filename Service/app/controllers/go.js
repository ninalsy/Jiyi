
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var Photo = mongoose.model('Photo')
var queryBase = require('queryBase')

exports.index = function (req, res) {
  var params = req.params;

  var requestLocation = queryBase.requestLocation([params.long, params.lat], 100000, 0);

  Photo.findCloseBy(requestLocation, {}, function(err, photos) {
 	res.send(photos);
  });
};
