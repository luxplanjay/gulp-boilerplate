const gulp = require('gulp');
const paths = require('../paths');

const fonts = () => {
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.build.fonts));
};

module.exports = fonts;
