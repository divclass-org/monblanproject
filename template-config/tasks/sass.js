'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const sortMediaQueries = require('postcss-sort-media-queries');
const discardComments = require('postcss-discard-comments');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const isTailwindcss = process.env.USE_TAILWINDCSS === 'true';

const combineSelectors = require('postcss-combine-duplicated-selectors');



module.exports = function (options) {

	const postCssPlugins = [
		autoprefixer(),
		sortMediaQueries({ sort: 'desktop-first' }),
		discardComments({ removeAll: true }),
		combineSelectors({removeDuplicatedProperties: true}),
	];

	if (isTailwindcss || options.use_tailwindcss) {
		postCssPlugins.push(tailwindcss(options.tailwind_config));
	}

	if (!isDevelopment) {
		postCssPlugins.push(cssnano());
	}

	return function () {
		return gulp.src(options.src, { allowEmpty: true })
			.pipe($.plumber({
				errorHandler: $.notify.onError(function (error) {
					return {
						title: 'SASS Compilation Error',
						message: '<%= error.message %>',
					}
				})
			}))

			.pipe($.if(isDevelopment, $.sourcemaps.init()))	

			.pipe(sass({ outputStyle: 'expanded' }))

			.pipe(postcss(postCssPlugins))

			.pipe($.if(isDevelopment, $.sourcemaps.write('.')))	
			.pipe(gulp.dest(options.dst))

	};
	
};