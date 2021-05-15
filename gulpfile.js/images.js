const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const webp = require('gulp-webp');
const mode = require('gulp-mode')();
const cache = require('gulp-cache');
const paths = require('./paths');

const imageminOptions = {
    mozjpeg: {
        quality: 75,
        progressive: true,
    },
    optipng: {
        optimizationLevel: 5,
    },
    svgo: {
        plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
            { removeComments: true },
            { removeEmptyContainers: true },
        ],
    },
};

const webpOptions = {
    quality: 75,
};

const images = () => {
    return gulp
        .src(paths.src.images)
        .pipe(newer(paths.src.images.join(' ')))
        .pipe(webp(webpOptions))
        .pipe(gulp.dest(paths.dist.images))
        .pipe(gulp.src(paths.src.images))
        .pipe(
            mode.production(
                cache(
                    imagemin([
                        imagemin.mozjpeg(imageminOptions.mozjpeg),
                        imagemin.optipng(imageminOptions.optipng),
                        imagemin.svgo(imageminOptions.svgo),
                    ]),
                ),
            ),
        )
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(paths.dist.images));
};

module.exports = images;
