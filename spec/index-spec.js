var packageConfig = require('../package.json');
var smartthings = require('passport-smartthings');

describe("passport-smartthings", function () {

    it("should report a version", function () {
        var version = smartthings.version;
        expect(version).toEqual(packageConfig.version);
    });

});
