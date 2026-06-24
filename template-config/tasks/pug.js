'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const sizeOf = require("image-size");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {

  const cfg = options.cfg;
  const emitty = require('emitty').setup(cfg.src.templates, 'pug');


  return function () {

    return emitty.scan(global.emittyChangedFile).then(() => {

      return gulp.src(options.src, { allowEmpty: true })
        .pipe($.plumber({
          errorHandler: $.notify.onError(function (err) {
            return {
              title: 'PUG Compilation Error',
              message: '<%= error.message %>',
            }
          })
        }))

        .pipe($.if(global.watch, emitty.filter(global.emittyChangedFile)))
        .pipe($.pug({
          locals: {
            sizeOf: sizeOf
          },
          pretty: true 
        }))
        .pipe($.replace('../', 'assets/'))

        .pipe(gulp.dest(options.dst))

    });



  };




};


