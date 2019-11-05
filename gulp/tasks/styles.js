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

const styles = () => {
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

module.exports = styles;

// const styles = () => {
//   return src('src/sass/styles.scss')
//     .pipe(plumber())
// .pipe(
//   stylelint({
//     reporters: [{ formatter: 'string', console: true }],
//   }),
// )
//     .pipe(sass())
// .pipe(
//   postcss([
//     autoprefixer({
//       browsers: ['last 2 versions'],
//     }),
//   ]),
// )
//     .pipe(gcmq())
//     .pipe(csso())
//     .pipe(rename('styles.min.css'))
//     .pipe(dest('build/css'))
//     .pipe(server.stream());
// };
