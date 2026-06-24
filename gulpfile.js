'use strict';


const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const cfg = require('./template-config/config.json').config;
const tailwind_config = require('./template-config/tailwind.config.js');

const isPug = process.env.USE_PUG === 'true';
const isTailwindcss = process.env.USE_TAILWINDCSS === 'true';

const path = require('path');






function lazyRequiredTask(taskName, url, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function (callback) {
		let task = require(path.resolve(__dirname, url)).call(this, options);

		return task(callback);
	})
}




lazyRequiredTask('pug', cfg.tasks_dir + '/pug', {
	src: [cfg.src.templates + '/*.pug'],
	cfg: cfg,
	dst: cfg.src.root
});

lazyRequiredTask('pug:watch', cfg.tasks_dir + '/pug_watch', {
	src: [cfg.src.templates + '/**/*.pug'],
});



lazyRequiredTask('sass', cfg.tasks_dir + '/sass', {
  src: [cfg.src.sass + '/styles.scss', cfg.src.sass + '/fonts.scss'],
  tailwind_config: tailwind_config,
  dst: cfg.src.css
});

let watch_files_for_sass = [cfg.src.sass + '/**/*.{scss,sass}', cfg.src.plugins + '/**/*.{scss,sass}'];

if (isTailwindcss) {
  watch_files_for_sass.push(cfg.src.root + '/**/*.{html,php}');
}

lazyRequiredTask('sass:watch', cfg.tasks_dir + '/sass_watch', {
  src: watch_files_for_sass,
});



lazyRequiredTask('mainjs', cfg.tasks_dir + '/mainjs', {
	src: [cfg.src.js + '/main.js'],
	jsName: 'main.min.js',
	dst: cfg.src.js
});

lazyRequiredTask('mainjs:watch', cfg.tasks_dir + '/mainjs_watch', {
	src: [cfg.src.js + '/main.js'],
});



lazyRequiredTask('scripts', cfg.tasks_dir + '/scripts', {
	src: cfg.src.jsLibs + '/**/*.js',
	dst: cfg.src.js
});

lazyRequiredTask('scripts:watch', cfg.tasks_dir + '/scripts_watch', {
	src: cfg.src.jsLibs + '/**/*.js',
});



lazyRequiredTask('browserSync', cfg.tasks_dir + '/browserSync', {
	src: [cfg.src.js + '/**/*.js', cfg.src.root + '/**/*.html', cfg.src.css + '/**/*.css'],
	baseFolder: cfg.src.root
});

// lazyRequiredTask('browserSync', cfg.tasks_dir + '/browserSync', {
// 	proxyDir: cfg.localPath.root,
// 	src: [cfg.src.js + '/**/*.js', cfg.src.root + '/*.php', cfg.src.css + '/*.css'],
// });



const tasks_build = [
	'sass',
	'mainjs',
	'scripts',
];

const tasks_watch = [
	'sass:watch',
	'mainjs:watch',
	'scripts:watch',
	'browserSync',
];

if (isPug) {
	tasks_build.push('pug');
	tasks_watch.push('pug:watch');
}


gulp.task('build', gulp.series(
	gulp.parallel(tasks_build)
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(tasks_watch)
));




