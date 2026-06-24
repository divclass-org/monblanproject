'use strict';

const gulp = require('gulp');

module.exports = function (options) {

	return function () {
		gulp.watch(options.src, { allowEmpty: true }, gulp.series('mainjs'));
	};
	
};