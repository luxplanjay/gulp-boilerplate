import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import cachebust from 'gulp-cache-bust';
import webpHtml from 'gulp-webp-html';
import makeMode from 'gulp-mode';
import paths from './paths';

const mode = makeMode();

const htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true,
};

const cachebustOptions = {
    type: 'timestamp',
};

const html = () => {
    return gulp
        .src(paths.src.html)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(mode.production(htmlmin(htmlminOptions)))
        .pipe(mode.production(cachebust(cachebustOptions)))
        .pipe(gulp.dest(paths.dist.html));
};

module.exports = html;
