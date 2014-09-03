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
        test.expect(2);
        test.ok(grunt.file.exists('tmp/1'), 'tmp/1 should exist');
        test.ok(!grunt.file.exists('test/files/1'), 'test/files/1 should NOT exist');
        test.done();
    },

    two: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('tmp/2'), 'tmp/2 should exist');
        test.ok(!grunt.file.exists('test/files/2'), 'test/files/2 should NOT exist');
        test.done();
    },

    three: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('tmp/three'), 'tmp/three should exist');
        test.ok(!grunt.file.exists('test/files/3'), 'test/files/3 should NOT exist');
        test.done();
    },

    four: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('tmp/tmp/4'), 'tmp/tmp/1 should exist');
        test.ok(!grunt.file.exists('test/files/4'), 'test/files/4 should NOT exist');
        test.done();
    },

    five: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('tmp/tmp/five'), 'tmp/tmp/five should exist');
        test.ok(!grunt.file.exists('test/files/5'), 'test/files/5 should NOT exist');
        test.done();
    },

    six: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('./6'), './6 should exist');
        test.ok(!grunt.file.exists('test/files/6'), 'test/files/6 should NOT exist');
        test.done();
    },

    seven: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('7'), './7 should exist');
        test.ok(!grunt.file.exists('test/files/7'), 'test/files/7 should NOT exist');
        test.done();
    },

    eight: function(test) {
        test.expect(2);
        test.ok(grunt.file.exists('eight'), './eight should exist');
        test.ok(!grunt.file.exists('test/files/8'), 'test/files/8 should NOT exist');
        test.done();
    },

    nineAndTen: function(test) {
        test.expect(5);
        test.ok(grunt.file.exists('tmp/tmp/tmp/9'), 'tmp/tmp/tmp/9 should exist');
        test.ok(grunt.file.exists('tmp/tmp/tmp/10'), 'tmp/tmp/tmp/10 should exist');
        test.ok(!grunt.file.exists('test/files/9'), 'test/files/9 should NOT exist');
        test.ok(!grunt.file.exists('test/files/10'), 'test/files/10 should NOT exist');
        test.equal(grunt.file.read('test/files/sleep'), 'Slept', 'Sleep should have finished');
        test.done();
    },

    twoHundreds: function(test) {
        test.expect(7);
        test.ok(grunt.file.exists('tmp/20/test/files/201'), 'tmp/20/test/files/201 should exist');
        test.ok(grunt.file.exists('tmp/20/test/files/202'), 'tmp/20/test/files/202 should exist');
        test.ok(grunt.file.exists('tmp/20/test/files/203'), 'tmp/20/test/files/203 should exist');
        test.ok(!grunt.file.exists('test/files/201'), 'test/files/201 should NOT exist');
        test.ok(!grunt.file.exists('test/files/202'), 'test/files/202 should NOT exist');
        test.ok(!grunt.file.exists('test/files/203'), 'test/files/203 should NOT exist');
        test.equal(grunt.file.read('test/files/sleep'), 'Slept', 'Sleep should have finished');
        test.done();
    },

};
