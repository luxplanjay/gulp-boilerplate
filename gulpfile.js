"use strict";

// В переменные получаем установленные пакеты
const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("gulp-cssnano");
const mmq = require("gulp-merge-media-queries");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const plumber = require("gulp-plumber");
const stylelint = require("gulp-stylelint");
const rename = require("gulp-rename");
const server = require("browser-sync").create();

// Создаем таск для сборки html файлов
gulp.task("html", () => {
  // Берем все файлы с расширением html в папке src
  return (
    gulp
      .src("./src/*.html")
      // минифицируем html
      .pipe(
        htmlmin({
          collapseWhitespace: true
        })
      )
      // выкидываем html в папку dist
      .pipe(gulp.dest("./dist"))
      // говорим browser-sync о том что пора перезагрузить барузер, так как файл изменился
      .pipe(server.stream())
  );
});

// Создаем таск для сборки css файлов
gulp.task("css", () => {
  // Берем только файл styles.scss в папке src, в который все импортируется
  return (
    gulp
      .src("./src/sass/styles.scss")
      .pipe(plumber())
      // Проверяем качество кода с помощью stylelint
      .pipe(
        stylelint({
          reporters: [{ formatter: "string", console: true }]
        })
      )
      // Преобразовываем sass в css
      .pipe(sass())
      // Создаем вендорные префиксы
      .pipe(postcss([autoprefixer()]))
      // Группируем медиа правила
      .pipe(mmq({ log: false }))
      // Выкидываем css в папку dist
      .pipe(gulp.dest("./dist/css"))
      // Минифицируем css
      .pipe(cssnano())
      // Переименовываем добавляя .min
      .pipe(rename("styles.min.css"))
      // Выкидываем минифицированный css в папку dist
      .pipe(gulp.dest("./dist/css"))
      // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
      .pipe(server.stream())
  );
});

// Создаем таск для оптимизации картинок
gulp.task("img", () => {
  // Берем все картинки из папки img
  return (
    gulp
      .src("./src/img/**/*.{png,jpg,svg}")
      // Пробуем оптимизировать
      .pipe(
        imagemin([
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 3 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: false }, { cleanupIDs: false }]
          })
        ])
      )
      // Выкидываем в папку dist/img
      .pipe(gulp.dest("./dist/img"))
      // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
      .pipe(server.stream())
  );
});

// Таск копирования всех шрифтов из папки fonts в dist/fonts
gulp.task("fonts", () => {
  return (
    gulp
      .src("./src/fonts/**/*.*")
      .pipe(gulp.dest("./dist/fonts"))
      // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
      .pipe(server.stream())
  );
});

// Таск слежения за изменениями файлов
gulp.task("watch", () => {
  // Следим за изменениями в любом html файле и вызываем таск 'html' на каждом изменении
  gulp.watch("./src/*.html", ["html"]);
  // Следим за изменениями в любом sass файле и вызываем таск 'css' на каждом изменении
  gulp.watch("./src/sass/**/*.scss", ["css"]);
  // Следим за изменениями картинок и вызываем таск 'img' на каждом изменении
  gulp.watch("./src/img/**/*.*", ["img"]);
  // Следим за изменениями в шрифтах и вызываем таск 'fonts' на каждом изменении
  gulp.watch("./src/fonts/**/*.*", ["fonts"]);
});

// Таск создания и запуска веб-сервера
gulp.task("server", () => {
  server.init({
    server: {
      // указываем из какой папки "поднимать" сервер
      baseDir: "./dist"
    },
    // Говорим спрятать надоедливое окошко обновления в браузере
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

// Таск удаления папки dist, будем вызывать 1 раз перед началом сборки
gulp.task("del:dist", () => {
  return del.sync("./dist");
});

// Таск который 1 раз собирает все статические файлы
gulp.task("build", ["html", "css", "img", "fonts"]);

// Главный таск, сначала удаляет папку dist,
// потом собирает статику, после чего поднимает сервер
// и затем запускает слежение за файлами
// Запускается из корня проекта командой npm start
gulp.task("start", ["del:dist", "build", "server", "watch"]);
