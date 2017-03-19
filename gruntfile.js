module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        proj_name: 'jQuery Conveyor Ticker',
        proj_funcname: 'jConveyorTicker',
        proj_codename: 'jquery-conveyor-ticker',

        dirs: {
            dist_folder: 'dist',
            js_dist_folder: 'dist/js',
            css_dist_folder: 'dist/css',
            dl_folder: 'dl'
        },

        uglify : {
            options: {
                banner: "/*! <%= proj_name %> (<%= proj_funcname %>) v<%= pkg.version %> - Licensed under the <%= pkg.license %> license - <%= pkg.author %> / Project home: <%= pkg.homepage %> */\n"
            },
            target: {
                files: {
                    "<%= dirs.js_dist_folder %>/jquery.<%= proj_funcname %>.min.js" : "<%= dirs.js_dist_folder %>/jquery.<%= proj_funcname %>.js"
                }
            }
        },

        cssmin: {
            options: {},
            target: {
                files: {
                    '<%= dirs.css_dist_folder %>/jquery.<%= proj_funcname %>.min.css': ['<%= dirs.css_dist_folder %>/jquery.<%= proj_funcname %>.css']
                }
            }
        },

        watch: {
            options: {
                livereload: false,
                spawn: false
            },
            js: {
                files: [
                    "<%= dirs.js_dist_folder %>/jquery.<%= proj_funcname %>.js"
                ],
                tasks: ["minify_js"]
            },
            css: {
                files: [
                    "<%= dirs.css_dist_folder %>/jquery.<%= proj_funcname %>.css"
                ],
                tasks: ["minify_css"]
            }
        },
        
        jshint: {
            files: [
                "<%= dirs.js_dist_folder %>/jquery.<%= proj_funcname %>.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= dirs.dl_folder %>/<%= proj_funcname %>.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.dist_folder %>/',
                        src: ['**'],
                        dest: '<%= proj_codename %>/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.registerTask("zip_dist", [
        "compress"
    ]);
    grunt.registerTask("minify_js", [
        "jshint",
        "uglify"
    ]);
    grunt.registerTask("minify_css", [
        "cssmin"
    ]);
    grunt.registerTask("test", [
        "minify_js",
        "minify_css"
    ]);
    grunt.registerTask("default", [
        "test",
        "watch"
    ]);

};