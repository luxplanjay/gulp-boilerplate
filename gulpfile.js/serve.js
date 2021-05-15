const browserSync = require('browser-sync').create();
const paths = require('./paths');

const serve = () => {
    browserSync.init({
        server: {
            baseDir: paths.distFolder,
        },
        watch: true,
        logLevel: 'info',
        logPrefix: 'DevServer',
        logFileChanges: true,
        reloadOnRestart: true,
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
