const { src, dest } = require('gulp');
const rigger = require('gulp-rigger');
const htmlmin = require('gulp-htmlmin');
const mode = require('gulp-mode')();
const paths = require('../paths');

const html = () => {
  return (
    src(paths.src.html)
      .pipe(rigger())
      // TODO: only in prod
      .pipe(mode.production(htmlmin({ collapseWhitespace: true })))
      .pipe(dest(paths.build.html))
  );
};

module.exports = html;
