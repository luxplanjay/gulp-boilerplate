import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import groupMediaQueries from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import makeMode from 'gulp-mode';
import paths from './paths';

const mode = makeMode();

const sassOptions = {
    outputStyle: 'compressed',
    sourceMap: true,
    precision: 3,
    errLogToConsole: true,
};

const styles = () => {
    return gulp
        .src(paths.src.css)
        .pipe(plumber())
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass(sassOptions).on('error', notify.onError()))
        .pipe(mode.production(groupMediaQueries()))
        .pipe(mode.production(postcss([autoprefixer(), cssnano()])))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(paths.dist.css));
};

export default styles;
