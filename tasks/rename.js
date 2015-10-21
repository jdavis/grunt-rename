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

        //console.log(options);

        if (!this.files.length) {
            grunt.log.writeln('Moved '+'0'.cyan+' files.');
            return done();
        }

        async.eachLimit(this.files, 5, function (f, cb) {
            var dest = f.dest,
                dir = path.dirname(dest);

            // Check if no source files were found
            if (f.src.length === 0) {
                // Continue if ignore is set
                if (options.ignore) {
                    return cb();
                } else {
                    grunt.fail.warn('Could not move file to ' + f.dest + ' it did not exist.');
                    return cb();
                }
            }

            f.src.filter(function (file) {
                // Resolve some conflicts because path doesn't work as I would
                // expect
                if (dest.lastIndexOf(path.sep) === dest.length - 1) {
                    dir = dest;
                    dest = path.join(dir, path.basename(file));
                }

                grunt.file.mkdir(dir);

                // First try builtin rename ability
                fs.rename(file, dest, function (err) {
                    // Easy peasy
                    if (!err) {
                        grunt.verbose.writeln('Moved ' + file + ' to ' + dest);
                        return cb();
                    }

                    // Now fallback to copying/unlinking
                    var read = fs.createReadStream(file);
                    var write = fs.createWriteStream(dest);

                    read.on('error', function (err) {
                        grunt.fail.warn('Failed to read ' + file);
                        cb && cb();
                        cb = null;
                    });

                    write.on('error', function (err) {
                        grunt.fail.warn('Failed to write to ' + dest);
                        cb && cb();
                        cb = null;
                    });

                    write.on('close', function () {
                        // Now remove original file
                        grunt.file.delete(file);

                        grunt.verbose.writeln('Moved ' + file + ' to ' + dest);
                        cb && cb();
                        cb = null;
                    });

                    read.pipe(write);
                });
            });
        }, done);
    });
};
