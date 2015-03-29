var vows = require('vows');
var assert = require('assert');
var util = require('util');
var SmartThingsStrategy = require('passport-smartthings/strategy');

vows.describe('SmartThingsStrategy').addBatch({

  'strategy': {
    topic: function() {
      return new SmartThingsStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
    },

    'should be named smartthings': function (strategy) {
      assert.equal(strategy.name, 'smartthings');
    },
  }

}).export(module);
