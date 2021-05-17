import gulp from 'gulp';
import paths from './paths';
import { serve, browserSync } from './serve';
import html from './html';
import styles from './styles';
import images from './images';
import fonts from './fonts';
import injectLinks from './inject';
import clean from './clean';
import sprite from './sprite';
import scripts from './scripts';

const watch = done => {
    gulp.watch(paths.watch.html).on('change', gulp.series(html, browserSync.reload));
    gulp.watch(paths.watch.css).on('change', gulp.series(styles, browserSync.reload));
    gulp.watch(paths.watch.images, gulp.series(images, browserSync.reload));
    gulp.watch(paths.watch.sprite, gulp.series(sprite, browserSync.reload));
    gulp.watch(paths.watch.fonts, fonts);
    done();
};

export const start = gulp.series(
    clean,
    gulp.parallel(images, sprite, fonts, styles, scripts, html),
    injectLinks,
    watch,
    serve,
);

export const build = gulp.series(
    clean,
    gulp.parallel(images, sprite, fonts, styles, scripts, html),
    injectLinks,
);
