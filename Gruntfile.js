module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					angular: true
				}
			},
			all: ['Gruntfile.js', 'static/app/**/*.js', 'server.js']
		},
		jade: {
			main: {
				options: {
					data: {
						debug: true
					}
				},
				files: [
					{
						cwd: "static/partials/",
						src: "**/*.jade",
						dest: "static/tmp/partials/",
						expand: true,
						ext: ".js"
					},{
						cwd: "static/",
						src: "index.jade",
						dest: "build/",
						expand: true,
						ext: ".html"
					}
				]
			}
		},
		compass: {
			main: {
				options: {
					sassDir: 'static/sass/',
					cssDir: 'static/tmp/css/'
				}
			}
		},
		cssmin: {
			main: {
				files: {
					'build/css/style.css': [
						'bower_components/angular-bootstrap-colorpicker/css/colorpicker.css',
						'static/tmp/css/**/*.css'
					]
				}
			}
		},
		uglify: {
			main: {
				options: {
					sourceMap: 'build/js/script-map.js'
				},
				files: {
					'build/js/script.min.js': [
						'bower_components/angular/angular.min.js',
						'bower_components/angular-animate/angular-animate.min.js',
						'bower_components/angular-route/angular-route.min.js',
						'bower_components/angular-sanitize/angular-sanitize.min.js',
						'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
						'static/app/controllers.js',
						'static/app/directives.js',
						'static/app/app.js'
					]
				}
			}
		},
		concat: {
			main: {
				files: {
					'static/tmp/templates.js': ['static/tmp/partials/**/*.js']
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						cwd: "static/",
						expand: true,
						src: ['img/**/*'],
						dest: 'build/'
					}
				]
			}
		},
		nodemon: {
			main: {
				options: {
					file: 'server.js',
					nodeArgs: ['--debug'],
					env: {
						PORT: '7000'
					}
				}
			}
		},
		concurrent: {
			main: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		watch: {
			jade: {
				files: ['static/index.jade','static/partials/**/*.jade'],
				tasks: ['jade']
			},
			concat_tpl: {
				files: ['static/tmp/partials/**/*.js'],
				tasks: ['concat']
			},
			js: {
				files: ['Gruntfile.js', 'static/app/**/*.js'],
				tasks: ['jshint', 'uglify']
			},
			sass: {
				files: ['static/sass/**/*.sass'],
				tasks: ['compass']
			},
			css: {
				files: ['static/tmp/css/**/*.css'],
				tasks: ['cssmin']
			},
			img: {
				files: ['static/img/**/*'],
				tasks: ['copy']
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concurrent');

	// Register tasks.
	grunt.registerTask('build', ['jade', 'compass', 'cssmin', 'jshint', 'uglify', 'copy']);
	grunt.registerTask('default', ['build', 'concurrent']);
};