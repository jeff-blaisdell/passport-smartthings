
var SmartThingsGraphAPIError = require('passport-smartthings/errors/smartthings-graph-api-error');

describe("passport oauth smartthings graph api error", function () {

    it("should create a graph error", function () {
        var message = 'An error occurred';
        var type = 'ScopeError';
        var error = new SmartThingsGraphAPIError(message, type);

        expect(error.name).toEqual('SmartThingsGraphAPIError');
        expect(error.message).toEqual(message);
        expect(error.type).toEqual(type);
        expect(error.status).toEqual(500);
    });

});
