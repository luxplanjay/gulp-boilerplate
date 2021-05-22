import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import cachebust from 'gulp-cache-bust';
import webpHtml from 'gulp-webp-html';
import mode from 'gulp-mode';
import paths from './paths';

const htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
};

const cachebustOptions = {
    type: 'timestamp',
};

const html = () => {
    return gulp
        .src(paths.src.html)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(mode().production(htmlmin(htmlminOptions)))
        .pipe(mode().production(cachebust(cachebustOptions)))
        .pipe(gulp.dest(paths.dist.html));
};

export default html;
