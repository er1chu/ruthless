module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/three.js/build/three.js',
                    'js/loaders/BinaryLoader.js',
                    'js/Detector.js',
                    'js/libs/stats.min.js',
                    'bower_components/dat.gui/build/dat.gui.min.js',
                    'js/app.js'
                ],
                dest: 'js/app.concat.js'
            }
        },
        uglify: {
            build: {
                src: 'js/app.concat.js',
                dest: 'js/app.min.js'
            }
        },
        stylus: {
            compile: {
                files: {
                    'css/app.min.css': 'css/app.styl'
                }
            }
        },
        watch: {
            js: {
                files: [
                    'bower_components/**/*.js',
                    'js/**/!(app.min|app.concat).js'
                ],
                tasks: ['javascript']
            },
            css: {
                files: [
                    'css/**/*.styl'
                ],
                tasks: ['stylesheets']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('javascript', [
        'concat:js',
        'uglify'
    ]);
    grunt.registerTask('stylesheets', [
        'stylus'
    ]);

    grunt.registerTask('default', ['javascript', 'stylesheets', 'watch']);
};