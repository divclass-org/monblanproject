'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const path = require('path'); 

module.exports = function (options) {

	return function () {
		gulp.watch(options.src, gulp.series('scripts')).on('unlink', function (filepath) {
			$.remember.forget('scripts', path.resolve(filepath));
			delete $.cached.caches.scripts[path.resolve(filepath)];
		});
	};
	
};