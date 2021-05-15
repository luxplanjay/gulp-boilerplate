const gulp = require('gulp');
const inject = require('gulp-inject');
const paths = require('./paths');

const injectLinks = () => {
    const sources = gulp.src([paths.inject.css], {
        read: false,
    });

    return gulp
        .src(paths.inject.html)
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest(paths.dist.html));
};

module.exports = injectLinks;
