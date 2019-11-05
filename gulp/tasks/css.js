const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const size = require('gulp-size');
const assets = require('postcss-assets');
const usedcss = require('usedcss');
const rename = require('gulp-rename');
const mode = require('gulp-mode')();

const paths = require('../paths');

const css = () => {
  return (
    src(paths.src.css)
      .pipe(plumber())
      .pipe(mode.development(sourcemaps.init()))
      // .pipe(
      //   stylelint({
      //     reporters: [{ formatter: 'string', console: true }],
      //   }),
      // )
      .pipe(
        sass({
          sourceMap: true,
          // FIXME: image append not working
          imagePath: '/images/',
          precision: 3,
          errLogToConsole: true,
        }).on('error', sass.logError),
      )
      .pipe(mode.production(gcmq()))
      .pipe(
        mode.production(
          postcss([
            usedcss({
              html: ['src/index.html'],
            }),
            assets({
              // FIXME: image append not working
              loadPaths: ['/images/'],
              basePath: paths.build.css,
            }),
            autoprefixer(),
            cssnano,
          ]),
        ),
      )

      .pipe(mode.development(sourcemaps.write()))
      .pipe(size({ showFiles: true }))
      .pipe(rename('styles.css'))
      .pipe(dest(paths.build.css))
  );
  // .pipe(server.stream())
};

module.exports = css;
