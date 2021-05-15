const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const groupMediaQueries = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();
const paths = require('./paths');

const styles = () => {
  return gulp
    .src(paths.src.css)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'compressed',
        sourceMap: true,
        precision: 3,
        errLogToConsole: true,
      }).on('error', sass.logError),
    )
    .pipe(mode.production(groupMediaQueries()))
    .pipe(mode.production(postcss([autoprefixer(), cssnano()])))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(paths.dist.css));
};

module.exports = styles;
