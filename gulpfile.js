'use strict';

const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const stylelint = require('gulp-stylelint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const server = require('browser-sync').create();

function html() {
  return src('./src/*.html')
    .pipe(rigger())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('./build'));
}

function styles() {
  return src('./src/sass/styles.scss')
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    )
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(dest('./build/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(dest('./build/css'))
    .pipe(server.stream());
}

function scripts() {
  return src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('scripts.js'))
    .pipe(dest('./build/js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(dest('./build/js'));
}

gulp.task('sprite', () => {
  return gulp
    .src('./src/images/icons/icon-*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('images', () => {
  return gulp
    .src(['./src/images/**/*.{png,jpg,jpeg,svg}', '!./src/images/icons/**/*'])
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest('./build/images'));
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']).on('change', server.reload);
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']).on('change', server.reload);
});

gulp.task(
  'serve',
  gulp.series('styles', () => {
    return server.init({
      server: './build',
      notify: false,
      open: true,
      cors: true,
      ui: false,
      logPrefix: 'DevServer',
      host: 'localhost',
      port: 8080
    });
  })
);

gulp.task('clean', () => del('./build'));

// TODO: uncomment pre release
// gulp.task('prepare', () => del(['**/.gitkeep', 'README.md']));

// TODO: how to implement this now?
gulp.task('build', callback =>
  sequence(
    'clean',
    ['sprite', 'images', 'fonts', 'styles', 'html', 'scripts'],
    callback
  )
);

function defaultTask(done) {
  //
  console.log('hello from gulp 4');
  done();
}

gulp.task('start', callback => sequence('build', 'serve', 'watch', callback));

exports.default = defaultTask;
