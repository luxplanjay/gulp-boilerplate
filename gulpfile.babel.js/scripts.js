import gulp from 'gulp';
import webpack from 'webpack-stream';
import paths from './paths';

const scripts = () => {
    return gulp.src(paths.src.js).pipe(webpack()).pipe(gulp.dest(paths.dist.js));
};

export default scripts;
