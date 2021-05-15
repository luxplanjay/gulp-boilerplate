import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import notify from 'gulp-notify';
import svgmin from 'gulp-svgmin';
import paths from './paths';

const svgminOptions = {
    plugins: [
        { removeViewBox: false },
        { cleanupIDs: false },
        { removeComments: true },
        { removeEmptyContainers: true },
    ],
};

const svgSpriteOptions = {
    mode: {
        stack: {
            sprite: '../icons.svg',
        },
    },
};

const sprite = () => {
    return gulp
        .src(paths.src.sprite)
        .pipe(svgmin(svgminOptions))
        .pipe(svgSprite(svgSpriteOptions).on('error', notify.onError()))
        .pipe(gulp.dest(paths.dist.images));
};

module.exports = sprite;
