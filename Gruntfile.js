'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.initConfig({
		jshint: {
			dev: {
				src: ['Gruntfile.js', 'server.js', 'test/**/*.js'],
			},
			options: {
				node:true, 
				globals: {
					describe: true,
					it: true,
					before: true,
					after: true,
					beforeEach: true,
					afterEach: true
				}
			}
		}, 
		simplemocha: {
			dev: {
				src: ['test/**/*.js']
			},
			options: {
				timeout:1000
			}
		}
	});

	grunt.registerTask('linter', ['jshint:dev']);
	grunt.registerTask('test', 'simplemocha:dev');
	grunt.registerTask('default', ['linter', 'test']);
};