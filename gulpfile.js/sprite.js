const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const notify = require('gulp-notify');
const svgmin = require('gulp-svgmin');
const paths = require('./paths');

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
