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
						dest: "build/partials/",
						expand: true,
						ext: ".html"
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
					cssDir: 'static/css/'
				}
			}
		},
		cssmin: {
			main: {
				files: {
					'build/css/style.css': ['static/css/**/*.css']
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
						'static/app/controllers.js',
						'static/app/directives.js',
						'static/app/app.js'
					]
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['static/img/**/*'],
						dest: 'build/img/'
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
			js: {
				files: ['Gruntfile.js', 'static/app/**/*.js'],
				tasks: ['jshint', 'uglify']
			},
			sass: {
				files: ['static/sass/**/*.sass'],
				tasks: ['compass']
			},
			css: {
				files: ['static/css/**/*.css'],
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
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-concurrent');

	// Register tasks.
	grunt.registerTask('build', ['jade', 'compass', 'cssmin', 'jshint', 'uglify', 'copy']);
	grunt.registerTask('default', ['build', 'concurrent']);
};