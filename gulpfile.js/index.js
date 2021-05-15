'use strict';

const gulp = require('gulp');
const paths = require('./paths');
const { serve, browserSync } = require('./serve');
const html = require('./html');
const clean = require('./clean');

const watch = done => {
  gulp.watch(paths.watch.html).on('change', gulp.series(html, browserSync.reload));
  done();
};

exports.start = gulp.series(clean, html, watch, serve);
