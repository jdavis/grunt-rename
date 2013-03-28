'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.rename = {
    setUp: function(done) {
        done();
    },

    one: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('tmp/1'), '/tmp/1 should exist');
        test.done();
    },

    two: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('tmp/2'), '/tmp/2 should exist');
        test.done();
    },

    three: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('tmp/three'), '/tmp/three should exist');
        test.done();
    },

    four: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('tmp/tmp/4'), '/tmp/tmp/1 should exist');
        test.done();
    },

    five: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('tmp/tmp/five'), '/tmp/tmp/five should exist');
        test.done();
    },

    six: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('./6'), './6 should exist');
        test.done();
    },

    seven: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('7'), './7 should exist');
        test.done();
    },

    eight: function(test) {
        test.expect(1);
        test.ok(grunt.file.exists('eight'), './eight should exist');
        test.done();
    },
};
