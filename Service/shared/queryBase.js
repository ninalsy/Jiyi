exports.RequestLocation = function(coordinates, maxDistance, minDistance) {
	var requestLocation = {};
	requestLocation.coordinates = coordinates;
	requestLocation.maxDistance = maxDistance;
	requestLocation.minDistance = minDistance;
	return requestLocation;
}