'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {

	return function () {
		return gulp.src(options.src, { allowEmpty: true })
			.pipe($.concat(options.jsName)) 

			.pipe($.fileInclude({
				prefix: '@@',
				basepath: '@file'
			}))

			.pipe($.if(!isDevelopment, $.stripDebug()))
			.pipe($.if(!isDevelopment, $.uglify()))
			.pipe($.debug({ title: 'mainjs.js' }))
			.pipe(gulp.dest(options.dst)); 
	};
	
};