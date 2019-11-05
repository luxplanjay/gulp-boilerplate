'use strict';

const requireDir = require('require-dir');
const tasks = requireDir('./gulp/tasks', { recurse: true });
const paths = require('./gulp/paths');
const mode = require('gulp-mode')();

console.log('Mode: ', mode);

exports.html = tasks.html;
exports.images = tasks.images;
exports.css = tasks.css;

const { src, dest, series, parallel, watch } = require('gulp');

// const svgstore = require('gulp-svgstore');
// const plumber = require('gulp-plumber');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const rename = require('gulp-rename');
// const size = require('gulp-size');

const server = require('browser-sync').create();

const serve = () => {
  return server.init({
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
  watch(paths.watch.fonts).on('change', series(tasks.fonts, server.reload));

  watch(paths.watch.html).on('change', series(tasks.html, server.reload));

  watch(paths.watch.css).on('change', series(tasks.css, server.reload));

  //   watch('src/js/**/*.js').on('change', series(scripts, server.reload));

  done();
};

exports.start = series(
  tasks.clean,
  parallel(tasks.images, tasks.css, tasks.html),
  watcher,
  serve,
);

// const build = series(
//   clean,
//   parallel(sprite, images, fonts, html, styles, scripts),
// );

// const start = series(build, watcher, serve);

// exports.prepare = prepare;
// exports.build = build;
// exports.start = start;

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
