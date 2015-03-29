/**
 * Module dependencies.
 */
var util = require('util'),
    http = require('http'),
    URL = require('url'),
    Profile = require('./profile'),
    OAuth2Strategy = require('passport-oauth2').Strategy,
    InternalOAuthError = require('passport-oauth2').InternalOAuthError,
    SmartThingsGraphAPIError = require('./errors/smartthings-graph-api-error');

function Strategy(options, verify) {
  options = options || {};
  options.siteURL = options.siteURL || 'https://graph.api.smartthings.com'
  options.authorizationURL = options.authorizationURL || options.siteURL + '/oauth/authorize';
  options.tokenURL = options.tokenURL || options.siteURL + '/oauth/token';
  options.smartAppEndpointsURL = options.smartAppEndpointsURL || options.siteURL + '/api/smartapps/endpoints';
  options.scopeSeparator = options.scopeSeparator || ',';
  options.callbackURL = options.callbackURL || 'http://localhost:3000/auth/smartthings/callback';
  options.state = true;
  verify = verify || function(accessToken, refreshToken, profile, done) {
    return done(null, { profile: profile });
  }

  OAuth2Strategy.call(this, options, verify);
  this.name = 'smartthings';
  this._smartAppEndpointsURL = options.smartAppEndpointsURL;
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
  var url = URL.format(URL.parse(this._smartAppEndpointsURL));

  this._oauth2.get(url, accessToken, function (err, body, res) {
    var json;

    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }

      if (json && json.error && typeof json.error == 'object') {
        return done(new SmartThingsGraphAPIError(json.error.message, json.error.type));
      }
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse profile'));
    }

    var profile = Profile.parse(accessToken, json);
    done(null, profile);
  });
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
