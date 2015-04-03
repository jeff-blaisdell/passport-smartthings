
var profile = require('passport-smartthings/profile');

describe("passport oauth smartthings profile", function () {

    it("should create a user profile", function () {
        var accessToken = 'abcd';
        var endpoints = [
            {
                oauthClient: {},
                url: '/api/smartapps/installations/xxxx'
            },
            {
                oauthClient: {},
                url: '/api/smartapps/installations/yyyy'
            }
        ];

        var p = profile.parse(accessToken, endpoints);

        expect(p.accessToken).toEqual(accessToken);
        expect(p.endpoints).toEqual(endpoints);
    });

});
