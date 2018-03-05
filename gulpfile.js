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
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const plumber = require("gulp-plumber");
const stylelint = require("gulp-stylelint");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const sequence = require("run-sequence");

// Создаем таск для сборки html файлов
gulp.task("html", () => {
  // Берем все файлы с расширением html в папке src
  return (
    gulp
      .src("./src/*.html")
      // обратаываем все include теги через posthtml для инлайн спрайтов
      // если таковые есть
      .pipe(posthtml([include()]))
      // минифицируем html
      .pipe(
        htmlmin({
          collapseWhitespace: true
        })
      )
      // выкидываем html в папку build
      .pipe(gulp.dest("./build"))
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
      // Выкидываем css в папку build
      .pipe(gulp.dest("./build/css"))
      // Минифицируем css
      .pipe(cssnano())
      // Переименовываем добавляя .min
      .pipe(rename("styles.min.css"))
      // Выкидываем минифицированный css в папку build
      .pipe(gulp.dest("./build/css"))
      // Говорим browser-sync о том что пора перезагрузить барузер так как файл изменился
      .pipe(server.stream())
  );
});

// Переводим png и jpg в webP
gulp.task("webp", () => {
  return gulp
    .src("./src/img/**/*.{png,jpg,jpeg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("./build/img"));
});

// Создаем svg спрайт
gulp.task("svg-sprite", () => {
  return gulp
    .src("./src/img/**/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("./build/img"));
});

// Создаем таск для оптимизации картинок
gulp.task("images", () => {
  // Берем все картинки из папки img
  return (
    gulp
      .src("./src/img/**/*.{png,jpg,jpeg,svg}")
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
      // Выкидываем в папку build/img
      .pipe(gulp.dest("./build/img"))
  );
});

// Таск копирования всех шрифтов из папки fonts в build/fonts
gulp.task("fonts", () => {
  return gulp
    .src("./src/fonts/**/*.{woff,woff2}")
    .pipe(gulp.dest("./build/fonts"));
});

// Таск слежения за изменениями файлов
gulp.task("watch", () => {
  // Следим за изменениями в любом html файле и вызываем таск 'html' на каждом изменении
  gulp.watch("./src/*.html", ["html"]);
  // Следим за изменениями в любом sass файле и вызываем таск 'css' на каждом изменении
  gulp.watch("./src/sass/**/*.scss", ["css"]);
  // Следим за изменениями картинок и вызываем таск 'img' на каждом изменении
  // gulp.watch("./src/img/**/*.*", ["webp", "img"]);
});

// Таск создания и запуска веб-сервера
gulp.task("server", () => {
  server.init({
    server: {
      // указываем из какой папки "поднимать" сервер
      baseDir: "./build"
    },
    // Говорим спрятать надоедливое окошко обновления в браузере
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

// Таск удаления папки build, будем вызывать 1 раз перед началом сборки
gulp.task("del:build", () => {
  return del("./build");
});

// Главный таск для создания сборки в деплой,
// сначала удаляет папку build, потом собирает статику
// Таск который 1 раз собирает все статические файлы
// Запускается из корня проекта командой npm run build
gulp.task("build", function(done) {
  sequence(
    "del:build",
    "svg-sprite",
    "webp",
    "images",
    "fonts",
    "css",
    "html",
    done
  );
});

// Главный таск для разработки, сначала удаляет папку build,
// потом собирает статику, после чего поднимает сервер
// и запускает слежение за файлами
// Запускается из корня проекта командой npm start
gulp.task("start", function(done) {
  sequence("build", "server", "watch");
});
