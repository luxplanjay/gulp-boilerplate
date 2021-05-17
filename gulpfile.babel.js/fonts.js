import gulp from 'gulp';
import paths from './paths';

const fonts = () => {
    return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dist.fonts));
};

export default fonts;
