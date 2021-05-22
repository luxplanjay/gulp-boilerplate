import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import mode from 'gulp-mode';
import webpack from 'webpack';
import paths from './paths';
import webpackConfig from '../webpack.config';

const scripts = () => {
    return gulp
        .src(paths.src.js)
        .pipe(
            webpackStream(
                {
                    ...webpackConfig,
                    mode: mode().development() ? 'development' : 'production',
                },
                webpack,
            ),
        )
        .pipe(gulp.dest(paths.dist.js));
};

export default scripts;
