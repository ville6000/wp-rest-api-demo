module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        concat:      {
            dist_css: {
                src:  [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                    'src/assets/css/main.css'
                ],
                dest: 'dist/assets/css/styles.min.css'
            },
            dist_js:  {
                src:  [
                    'node_modules/moment/min/moment.min.js',
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-route/angular-route.min.js',
                    'node_modules/angular-sanitize/angular-sanitize.min.js',
                    'node_modules/angular-moment/angular-moment.min.js'
                ],
                dest: 'dist/assets/js/vendor.min.js'
            }
        },
        copy:        {
            templates: {
                expand: true,
                filter: 'isFile',
                cwd: 'src/assets/templates/',
                src:    '*',
                dest:   'dist/assets/templates/'
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/assets/js/app.min.js': ['src/assets/js/*.js']
                }
            }
        }
    });

    grunt.registerTask("default", ["processhtml", "concat", 'uglify', "copy"]);
};