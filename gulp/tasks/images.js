const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const mode = require('gulp-mode')();
const paths = require('../paths');

const imageMinConfig = {
  jpegtran: { progressive: true },
  optipng: { optimizationLevel: 5 },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
  },
};

const images = () => {
  return gulp
    .src(paths.src.images)
    .pipe(newer(paths.build.images))
    .pipe(
      mode.production(
        imagemin([
          imagemin.jpegtran(imageMinConfig.jpegtran),
          imagemin.optipng(imageMinConfig.optipng),
          imagemin.svgo(imageMinConfig.svgo),
        ]),
      ),
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(paths.build.images));
};

module.exports = images;
