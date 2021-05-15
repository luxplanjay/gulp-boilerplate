/*
 * Assembling .html files
 */
const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const mode = require('gulp-mode')();
const htmlmin = require('gulp-htmlmin');
const cachebust = require('gulp-cache-bust');
const paths = require('./paths');

const htmlminOptions = {
  removeComments: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeOptionalTags: true,
};

const cachebustOptions = {
  type: 'timestamp',
};

const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(fileInclude())
    .pipe(mode.production(htmlmin(htmlminOptions)))
    .pipe(mode.production(cachebust(cachebustOptions)))
    .pipe(gulp.dest(paths.dist.html));
};

module.exports = html;
