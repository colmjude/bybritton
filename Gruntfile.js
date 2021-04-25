module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ["dist"]
        },
        compass: {
            build: {},
            watch: {
                options: {
                    watch: true
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/images/**'],
                        dest: 'dist/images',
                        filter: 'isFile'
                    }
                ]
            },
            update: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/js/**'],
                        dest: 'dist/js',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/js/*.js']
        },
        staticHandlebars: {
            src: {
                options: {
                    assets: {
                        partialPath: 'src/partials/'
                    }
                },
                files: {
                    'dist/*.html': 'src/*.html'
                }
            }
        },
        watch: {
            options: {},
            css: {
                files: ["src/sass/**/*.scss"],
                tasks: ['compass:build', 'copy:update']
            },
            html: {
                // may want to add .json files here too
                files: ["src/*.html", "src/partials/*.html"],
                tasks: ['staticHandlebars']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-static-handlebars');
    grunt.loadNpmTasks("grunt-curl");
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint:all', 'copy']);
    grunt.registerTask('build', ['jshint:all', 'compass:build', 'copy', 'staticHandlebars']);
    // update assets for already built pages
    grunt.registerTask('update', ['compass:build', 'copy:update']);

};