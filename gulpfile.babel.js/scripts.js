import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import mode from 'gulp-mode';
import rename from 'gulp-rename';
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
        .pipe(mode().production(rename({ suffix: '.min' })))
        .pipe(gulp.dest(paths.dist.js));
};

export default scripts;
