'use strict';

const gulp = require('gulp');
const paths = require('./paths');
const { serve, browserSync } = require('./serve');
const html = require('./html');
const styles = require('./styles');
const clean = require('./clean');

const watch = done => {
  gulp.watch(paths.watch.html, gulp.series(html, browserSync.reload));
  gulp.watch(paths.src.css, gulp.series(styles, browserSync.reload));
  done();
};

exports.start = gulp.series(clean, gulp.parallel(styles, html), watch, serve);
