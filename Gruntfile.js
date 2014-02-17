// Generated on Feb-17-2014
"use strict";

module.exports = function(grunt) {

    // load all grunt tasks
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // configurable paths
    var textcountConfig = {
        app: "src",
        dist: "."
    };

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),
        textcount: textcountConfig,
        banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> \n" +
          " * \n" +
          " <%= pkg.description %> \n"+
          " <%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
          " * \n" +
          " * Copyright (c) Release under <%= pkg.license.type %> License " +
          "by <%= pkg.author.name %>, <%= grunt.template.today('yyyy') %> \n */\n",

        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src:  "<%= textcount.dist %>/<%= pkg.name %>.js",
                dest: "<%= textcount.dist %>/<%= pkg.name %>.min.js"
            }
        },

        coffee: {
            dist: {
                options: {
                    bare: true,
                    join: true
                },
                files: {
                    "<%= textcount.dist %>/<%= pkg.name %>.js": ["<%= textcount.app %>/*.coffee"]
                }
            }
        },

        coffeelint: {
            dist: {
              files:{
                src: ["<%= textcount.app %>/*.coffee"]
              }
            },
            options: {
              "no_trailing_whitespace": {
                "level": "error"
              },
              "max_line_length": {
                "level": "warn"
              }
            }
        },

        clean: {
          dist: {
            files: [{
              dot: true,
              src: [
                "<%= textcount.dist %>/<%= pkg.name %>.js",
                "<%= textcount.dist %>/<%= pkg.name %>.min.js"
              ]
            }]
          }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
                // force: true
            },
            all: [
                "Gruntfile.js",
                "<%= textcount.dist %>/{,*/}*.js",
                "<%= textcount.app %>/{,*/}*.js"
            ]
        },

        qunit: {
            files: ["test/**/*.html"]
        },

        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            lib_test: {
                files: "<%= jshint.lib_test.src %>",
                tasks: ["jshint:lib_test", "qunit"]
            }
        }
    });

    // Default task.
    // grunt.registerTask("default", ["clean","coffee", "jshint", "qunit", "concat", "uglify"]);

    grunt.registerTask("default", [
      "clean",
      "coffeelint",
      "coffee",
      "jshint",
      "uglify"
      ]
    );


    grunt.registerTask("build", [
      "clean",
      "coffeelint",
      "coffee",
      "jshint",
      "uglify"
      ]
    );

};
