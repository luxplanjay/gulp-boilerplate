'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const stylelint = require('gulp-stylelint');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const sequence = require('run-sequence');

gulp.task('html', () =>
  gulp
    .src('./src/*.html')
    .pipe(rigger())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest('./build')),
);

gulp.task('styles', () =>
  gulp
    .src('./src/sass/styles.scss')
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }],
      }),
    )
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(gulp.dest('./build/css'))
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream()),
);

gulp.task('svg-sprite', () =>
  gulp
    .src('./src/img/sprite/**/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/img')),
);

gulp.task('images', () =>
  gulp
    .src(['./src/img/**/*.{png,jpg,jpeg,svg}', '!./src/img/sprite/**/*.*'])
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(gulp.dest('./build/img')),
);

gulp.task('fonts', () =>
  gulp.src('./src/fonts/**/*.{woff,woff2}').pipe(gulp.dest('./build/fonts')),
);

gulp.task('watch', () => {
  gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('serve', ['styles'], () =>
  browserSync.init({
    server: './build',
    notify: false,
    open: true,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: 3000,
  }),
);

gulp.task('del:build', () => del('./build'));

gulp.task('prepare', () => del(['**/.gitkeep', 'README.md', 'banner.png']));

gulp.task('build', cb =>
  sequence('del:build', 'svg-sprite', 'images', 'fonts', 'styles', 'html', cb),
);

gulp.task('start', cb => sequence('build', 'serve', 'watch'));
