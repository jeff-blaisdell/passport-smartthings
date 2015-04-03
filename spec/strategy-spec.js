
var SmartThingsStrategy = require('passport-smartthings/strategy');
var SmartThingsGraphAPIError = require('passport-smartthings/errors/smartthings-graph-api-error');

var smartThingsAccessToken, smartThingsEndpointsUrl, endpointsData, endpoints, strategy;


describe("passport oauth strategy", function () {

    beforeEach(function () {
        smartThingsAccessToken = 'smartThingsAccessToken';
        smartThingsEndpointsUrl = 'https://graph.api.smartthings.com/api/smartapps/endpoints';
        endpoints = [
            {
                oauthClient: {},
                url: "/api/smartapps/installations/xxxx"
            },
            {
                oauthClient: {},
                url: "/api/smartapps/installations/yyyy"
            }
        ];
        strategy = new SmartThingsStrategy({
            clientID: 'Client ID',
            clientSecret: 'Client Secret'
        });
    });

    it("should have an appropriately named strategy", function () {
        expect(strategy.name).toEqual('smartthings');
    });

    it("should retrieve a smartthings profile", function (done) {
        spyOn(strategy._oauth2, 'get').andCallFake(function(url, accessToken, callback) {
            expect(url).toEqual(smartThingsEndpointsUrl);
            expect(accessToken).toEqual(smartThingsAccessToken);
            var body = JSON.stringify(endpoints);
            callback(null, body, null);
        });

        var doneCallback = function(err, profile) {
            expect(profile.accessToken).toEqual(smartThingsAccessToken);
            expect(profile.endpoints.length).toEqual(endpoints.length);
            expect(profile.endpoints[0].url).toEqual(endpoints[0].url);
            done();
        };

        strategy.userProfile(smartThingsAccessToken, doneCallback);
    });

    it("should handle a failure retrieving a smartthings profile", function (done) {
        var error = {
            message: "API request must define a permission scope.",
            type: "AuthorizationError"
        };

        var errorResponse = {
            error: error
        };

        spyOn(strategy._oauth2, 'get').andCallFake(function(url, accessToken, callback) {
            expect(url).toEqual(smartThingsEndpointsUrl);
            expect(accessToken).toEqual(smartThingsAccessToken);
            callback({ data: JSON.stringify(errorResponse) }, null, null);
        });

        var doneCallback = function(err, profile) {
            expect(profile).toEqual(undefined);
            expect(err.type).toEqual(error.type);
            expect(err.message).toEqual(error.message);
            expect(err.name).toEqual('SmartThingsGraphAPIError');
            expect(err.status).toEqual(500);
            done();
        };

        strategy.userProfile(smartThingsAccessToken, doneCallback);
    });

    it("should handle a failure retrieving a smartthings profile with an unexpected error format", function (done) {

        var errorResponse = {
            message: 'A failure occurred.'
        };

        spyOn(strategy._oauth2, 'get').andCallFake(function(url, accessToken, callback) {
            expect(url).toEqual(smartThingsEndpointsUrl);
            expect(accessToken).toEqual(smartThingsAccessToken);
            callback({ data: JSON.stringify(errorResponse) }, null, null);
        });

        var doneCallback = function(err, profile) {
            expect(profile).toEqual(undefined);
            expect(err.message).toEqual('Failed to fetch user profile');
            expect(err.name).toEqual('InternalOAuthError');
            done();
        };

        strategy.userProfile(smartThingsAccessToken, doneCallback);
    });

});
