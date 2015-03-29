var vows = require('vows');
var assert = require('assert');
var util = require('util');
var smartthings = require('passport-smartthings');

vows.describe('passport-smartthings').addBatch({

  'module': {
    'should report a version': function (x) {
      assert.isString(smartthings.version);
    }
  }

}).export(module);
