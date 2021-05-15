const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const notify = require('gulp-notify');
const paths = require('./paths');

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
        .pipe(svgSprite(svgSpriteOptions).on('error', notify.onError()))
        .pipe(gulp.dest(paths.dist.images));
};

module.exports = sprite;
