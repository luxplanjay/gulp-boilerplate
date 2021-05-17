import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import size from 'gulp-size';
import webp from 'gulp-webp';
import mode from 'gulp-mode';
import paths from './paths';

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
            mode().production(
                imagemin([
                    imagemin.mozjpeg(imageminOptions.mozjpeg),
                    imagemin.optipng(imageminOptions.optipng),
                    imagemin.svgo(imageminOptions.svgo),
                ]),
            ),
        )
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(paths.dist.images));
};

export default images;
