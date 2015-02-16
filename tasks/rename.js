/*
 * grunt-rename
 * https://github.com/jdavis/grunt-rename
 *
 * Copyright (c) 2013 Josh Davis
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    async = require('async');

module.exports = function(grunt) {
    grunt.registerMultiTask('rename', 'Move and/or rename files.', function() {
        var done = this.async(),
            options = this.options({
                ignore: false,
            });

        if (!this.files.length) {
            grunt.log.writeln('Moved '+'0'.cyan+' files.');
            return done();
        }

        var functions = this.files.map(function (f) {
            return function(outerCallback) {
                var dest = f.dest,
                    dir = path.dirname(dest),
                    destIsDir = (dest.lastIndexOf(path.sep) === dest.length - 1);

                // Check if no source files were found
                if (f.src.length === 0) {
                    // Continue if ignore is set
                    if (!options.ignore) {
                        grunt.fail.warn('Could not move file to ' + f.dest + ' it did not exist.');
                    }
                    return outerCallback();
                }

                async.each(f.src, function (file, callback) {
                    var destFile = dest;

                    // Resolve some conflicts because path doesn't work as I would
                    // expect
                    if (destIsDir) {
                        dir = dest;
                        destFile = path.join(dir, path.basename(file));
                    }

                    grunt.file.mkdir(dir);

                    // First try builtin rename ability
                    fs.rename(file, destFile, function (err) {
                        // Easy peasy
                        if (!err) {
                            grunt.verbose.writeln('Moved ' + file + ' to ' + dest);
                            return callback();
                        }

                        // Now fallback to copying/unlinking
                        var read = fs.createReadStream(file);
                        var write = fs.createWriteStream(destFile);

                        read.on('error', function (err) {
                            grunt.fail.warn('Failed to read ' + file);
                            return callback(false);
                        });

                        write.on('error', function (err) {
                            grunt.fail.warn('Failed to write to ' + destFile);
                            return callback(false);
                        });

                        write.on('close', function () {
                            // Now remove original file
                            grunt.file.delete(file);

                            grunt.verbose.writeln('Moved ' + file + ' to ' + destFile);
                            return callback();
                        });

                        read.pipe(write);
                    });
                }, function(err) { outerCallback(err); });
            };
        });

        async.waterfall(functions, done);
    });
};
