'use strict';

const gulp = require('gulp');
const paths = require('./paths');
const { serve, browserSync } = require('./serve');
const html = require('./html');
const styles = require('./styles');
const images = require('./images');
const fonts = require('./fonts');
const injectLinks = require('./inject');
const clean = require('./clean');
const sprite = require('./sprite');

const watch = done => {
    gulp.watch(paths.watch.html).on('change', gulp.series(html, browserSync.reload));
    gulp.watch(paths.watch.css).on('change', gulp.series(styles, browserSync.reload));
    gulp.watch(paths.watch.images, gulp.series(images, browserSync.reload));
    gulp.watch(paths.watch.sprite, gulp.series(sprite, browserSync.reload));
    gulp.watch(paths.watch.fonts, fonts);
    done();
};

exports.start = gulp.series(
    clean,
    gulp.parallel(images, sprite, fonts, styles, html),
    injectLinks,
    watch,
    serve,
);

exports.build = gulp.series(clean, gulp.parallel(images, sprite, fonts, styles, html), injectLinks);
