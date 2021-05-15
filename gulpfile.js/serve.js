/*
 * BrowserSync web-server
 */
const browserSync = require('browser-sync').create();

const serve = () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    logPrefix: 'DevServer',
    notify: false,
    cors: true,
    open: false,
    ui: false,
    port: process.env.PORT ?? 7070,
  });
};

module.exports = {
  serve,
  browserSync,
};
