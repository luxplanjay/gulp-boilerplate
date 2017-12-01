// В переменные получаем установленные пакеты
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const mmq = require('gulp-merge-media-queries');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const rigger = require('gulp-rigger');

// Создаем таск для сборки html файлов
gulp.task('html', () => {
  // Берем все файлы с расширением html в папке src
  return gulp.src('./src/*.html')
    // с помощью ригера собираем куски html файлов, если таковые есть (//= в index.html)
    .pipe(rigger())
    // минифицируем html
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    // выкидываем html в папку dist
    .pipe(gulp.dest('./dist'))
    // говорим browser-sync о том что пора перезагрузить барузер, так как файл изменился
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Создаем таск для сборки css файлов
gulp.task('css', () => {
  // Берем только файл styles.scss в папке src, в который импортируеются паршалы
  return gulp.src('./src/sass/main.scss')
    // Преобразовываем sass в css
    .pipe(sass().on('error', sass.logError))
    // Создаем вендорные префиксы
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // Группируем медиа правила
    .pipe(mmq({
      log: false
    }))
    // Минифицируем css
    .pipe(cssnano())
    // Выкидываем css в папку dist
    .pipe(gulp.dest('./dist'))
    // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Создаем таск для оптимизации картинок
gulp.task('img', () => {
  // Берем все картинки из папки img
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
    // Пробуем оптимизировать
    .pipe(imagemin(
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })))
    // Выкидываем в папку dist/img
    .pipe(gulp.dest('./dist/images'))
    // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Таск копирования всех шрифтов из папки fonts в dist/fonts
gulp.task('fonts', () => {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'))
    // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Таск слежения за изменениями файлов
gulp.task('watch', () => {
  // Следим за изменениями в любом html файле и вызываем таск 'html' на каждом изменении
  gulp.watch('./src/**/*.html', ['html']);
  // Следим за изменениями в любом sass файле и вызываем таск 'css' на каждом изменении
  gulp.watch('./src/sass/**/*.scss', ['css']);
  // Следим за изменениями картинок и вызываем таск 'img' на каждом изменении
  gulp.watch('./src/images/**/*.*', ['img']);
  // Следим за изменениями в шрифтах и вызываем таск 'fonts' на каждом изменении
  gulp.watch('./src/fonts/**/*.*', ['fonts']);
});

// Таск создания и запуска веб-сервера
gulp.task('server', () => {
  browserSync.init({
    server: {
      // указываем из какой папки "поднимать" сервер
      baseDir: "./dist"
    },
    // Говорим спрятать надоедливое окошко обновления в браузере
    notify: false
  });
});

// Таск удаления папки dist, будем вызывать 1 раз перед началом сборки
gulp.task('del:dist', () => {
  return del.sync('./dist');
});

// Таск который 1 раз собирает все статические файлы
gulp.task('build', ['html', 'css', 'img', 'fonts']);

// Главный таск, сначала удаляет папку dist,
// потом собирает статику, после чего поднимает сервер
// и затем запускает слежение за файлами
// Запускается из корня проекта командой npm start
gulp.task('start', ['del:dist', 'build', 'server', 'watch']);
