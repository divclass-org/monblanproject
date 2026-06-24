'use strict';

const gulp = require('gulp');


module.exports = function (options) {
  return function (done) { 
    global.watch = true;

    gulp.watch(options.src, gulp.series('pug'))
      .on('all', (event, filepath) => {
        global.emittyChangedFile = filepath;
      })
      .on('end', done);
  };
};


