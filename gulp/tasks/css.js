const { src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const stylelint = require('gulp-stylelint');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const size = require('gulp-size');
const assets = require('postcss-assets');
const usedcss = require('usedcss');
const paths = require('../paths');

const css = () => {
  return (
    src(paths.src.css)
      // .pipe(plumber())
      // TODO: prod only
      // .pipe(sourcemaps.init())
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
      // TODO: Prod only
      // .pipe(gcmq())
      .pipe(
        postcss([
          // TODO: enable after html task is ready
          // usedcss({
          //   html: ['index.html'],
          // }),
          assets({
            // FIXME: image append not working
            loadPaths: ['/images/'],
            basePath: paths.build.css,
          }),
          // TODO: prod only maybe
          autoprefixer(),
          // TODO: prod only
          // cssnano,
        ]),
      )
      // TODO: prod only
      // .pipe(sourcemaps.write())
      .pipe(size({ showFiles: true }))
      // TODO: prod only
      // .pipe(rename('styles.min.css'))
      .pipe(dest(paths.build.css))
  );
  // .pipe(server.stream())
};

module.exports = css;
