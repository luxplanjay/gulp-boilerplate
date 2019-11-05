'use strict';

const { series, parallel, watch } = require('gulp');
const requireDir = require('require-dir');
const tasks = requireDir('./gulp/tasks', { recurse: true });
const paths = require('./gulp/paths');

// const svgstore = require('gulp-svgstore');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');

const browserSync = require('browser-sync').create();

const serve = () => {
  return browserSync.init({
    // baseDir: './',
    server: 'build',
    notify: false,
    open: false,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: 8080,
  });
};

const watcher = done => {
  watch(paths.watch.fonts).on(
    'change',
    series(tasks.fonts, browserSync.reload),
  );

  watch(paths.watch.html).on('change', series(tasks.html, browserSync.reload));

  watch(paths.watch.css).on('change', series(tasks.css, browserSync.reload));

  watch(paths.watch.images, tasks.images);

  //   watch('src/js/**/*.js').on('change', series(scripts, server.reload));

  done();
};

exports.start = series(
  tasks.clean,
  parallel(tasks.images, tasks.css, tasks.fonts, tasks.html),
  watcher,
  serve,
);

exports.build = series(
  tasks.clean,
  tasks.images,
  parallel(tasks.css, tasks.fonts, tasks.html),
);

// exports.prepare = prepare;

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

// const prepare = () => {
//   return del(['**/.gitkeep', 'README.md']);
// };
