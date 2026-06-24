'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {

	return function () {
		return gulp.src(options.src, { allowEmpty: true })
			.pipe($.cached('scripts'))
			.pipe($.if(!isDevelopment, $.uglify())) 
			.pipe($.remember('scripts'))
			.pipe($.concat('libs.min.js')) 
			.pipe(gulp.dest(options.dst))
	};
	
};