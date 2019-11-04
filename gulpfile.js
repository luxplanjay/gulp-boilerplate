'use strict';

const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const server = require('browser-sync').create();

const newer = require('gulp-newer');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const assets = require('postcss-assets');
const usedcss = require('usedcss');

const paths = {
  src: {
    html: 'src/*.html',
    css: 'src/sass/main.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*',
  },
  watch: {
    html: 'src/**/*.html',
    css: 'src/sass/**/*.scss',
    js: 'src/js/**/*.js',
  },
  build: {
    html: 'build/',
    css: 'build/css',
    js: 'build/js',
    images: 'build/images',
    fonts: 'build/fonts',
  },
};

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

exports.css = css;

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

const images = () => {
  return src(paths.src.images)
    .pipe(newer(paths.build.images))
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(size({ showFiles: true }))
    .pipe(dest(paths.build.images));
};

exports.images = images;

// const html = () => {
//   return src('src/*.html')
//     .pipe(rigger())
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(dest('build'));
// };

// const styles = () => {
//   return src('src/sass/styles.scss')
//     .pipe(plumber())
//     .pipe(
//       stylelint({
//         reporters: [{ formatter: 'string', console: true }],
//       }),
//     )
//     .pipe(sass())
//     .pipe(
//       postcss([
//         autoprefixer({
//           browsers: ['last 2 versions'],
//         }),
//       ]),
//     )
//     .pipe(gcmq())
//     .pipe(csso())
//     .pipe(rename('styles.min.css'))
//     .pipe(dest('build/css'))
//     .pipe(server.stream());
// };

// const scripts = () => {
//   return src('src/js/**/*.js')
//     .pipe(plumber())
//     .pipe(babel())
//     .pipe(concat('scripts.js'))
//     .pipe(dest('build/js'))
//     .pipe(uglify())
//     .pipe(rename('scripts.min.js'))
//     .pipe(dest('build/js'));
// };

// const sprite = () => {
//   return src('src/images/icons/icon-*.svg')
//     .pipe(svgstore({ inlineSvg: true }))
//     .pipe(rename('sprite.svg'))
//     .pipe(dest('build/images'));
// };

// const imagesOld = () => {
//   return src(['src/images/**/*.{png,jpg,jpeg,svg}', '!src/images/icons/**/*'])
//     .pipe(
//       imagemin([
//         imagemin.jpegtran({ progressive: true }),
//         imagemin.optipng({ optimizationLevel: 5 }),
//         imagemin.svgo({
//           plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
//         }),
//       ]),
//     )
//     .pipe(dest('build/images'));
// };

// const fonts = () => {
//   return src('src/fonts/**/*').pipe(dest('build/fonts'));
// };

// const watcher = done => {
//   watch('src/**/*.html').on('change', series(html, server.reload));
//   watch('src/sass/**/*.scss').on('change', series(styles, server.reload));
//   watch('src/js/**/*.js').on('change', series(scripts, server.reload));

//   done();
// };

// const serve = () => {
//   return server.init({
//     server: 'build',
//     notify: false,
//     open: false,
//     cors: true,
//     ui: false,
//     logPrefix: 'DevServer',
//     host: 'localhost',
//     port: 8080,
//   });
// };

// const clean = () => {
//   return del('./build');
// };

// const prepare = () => {
//   return del(['**/.gitkeep', 'README.md']);
// };

// const build = series(
//   clean,
//   parallel(sprite, images, fonts, html, styles, scripts),
// );

// const start = series(build, watcher, serve);

// exports.prepare = prepare;
// exports.build = build;
// exports.start = start;
