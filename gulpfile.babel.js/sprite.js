import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import notify from 'gulp-notify';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
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
        symbol: {
            sprite: '../icons.svg',
        },
    },
};

const removeUselessAttrs = $ => {
    $('[fill]').removeAttr('fill');
    $('[stroke]').removeAttr('stroke');
    $('[style]').removeAttr('style');
};

const sprite = () => {
    return gulp
        .src(paths.src.sprite)
        .pipe(svgmin(svgminOptions))
        .pipe(
            cheerio({
                run: removeUselessAttrs,
                parserOptions: { xmlMode: true },
            }),
        )
        .pipe(svgSprite(svgSpriteOptions).on('error', notify.onError()))
        .pipe(gulp.dest(paths.dist.images));
};

export default sprite;
