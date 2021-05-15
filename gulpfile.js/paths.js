module.exports = {
  src: {
    html: 'src/*.html',
    css: 'src/sass/main.scss',
    js: 'src/js/**/main.js',
    images: 'src/img/**/*.{png,jpg,jpeg,webp,svg}',
    fonts: 'src/fonts/**/*.{woff,woff2}',
  },
  watch: {
    html: 'src/**/*.html',
    css: ['src/sass/**/*.scss', 'src/sass/*.scss'],
    js: 'src/js/**/*.js',
    images: 'src/img/**/*.{png,jpg,jpeg,webp,svg}',
  },
  dist: {
    html: 'dist/',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images',
    fonts: 'dist/fonts',
  },
  inject: {
    html: 'dist/index.html',
    css: 'dist/css/**/*.css',
    js: 'dist/js/**/*.js',
  },
  clean: 'dist/',
};
