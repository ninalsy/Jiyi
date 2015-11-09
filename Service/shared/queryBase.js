exports.RequestLocation = function(coordinates, maxDistance, minDistance) {
    var requestLocation = {};
    requestLocation.coordinates = coordinates || [0, 0];
    requestLocation.maxDistance = maxDistance || 100000;
    requestLocation.minDistance = minDistance || 0;
    return requestLocation;
}