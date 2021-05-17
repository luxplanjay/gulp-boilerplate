import BrowserSync from 'browser-sync';
import paths from './paths';

export const browserSync = BrowserSync.create();

export const serve = () => {
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
