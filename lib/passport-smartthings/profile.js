/**
 * Parse profile.
 *
 * @param {String} accessToken Smart Things API Access Token
 * @param {Object} endpoints Available API endpoints for authenticated user
 * @return {Object}
 */
exports.parse = function(accessToken, endpoints) {
    var profile = {};
    profile.accessToken = accessToken;
    profile.endpoints = endpoints;

    return profile;
};
