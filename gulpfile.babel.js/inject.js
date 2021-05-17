import gulp from 'gulp';
import inject from 'gulp-inject';
import paths from './paths';

const injectLinks = () => {
    const sources = gulp.src([paths.inject.css], {
        read: false,
    });

    return gulp
        .src(paths.inject.html)
        .pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest(paths.dist.html));
};

export default injectLinks;
