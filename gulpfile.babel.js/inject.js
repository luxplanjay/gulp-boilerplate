import fs from 'fs';
import gulp from 'gulp';
import inject from 'gulp-inject';
import paths from './paths';

const injectLinks = () => {
    return Promise.resolve(
        fs
            .readdirSync(paths.dist.html)
            .filter(filename => filename.endsWith('.html'))
            .forEach(filename => {
                const justFilename = filename.replace('.html', '');
                const sources = gulp.src(
                    [
                        `${paths.dist.css}/${justFilename}.min.css`,
                        `${paths.dist.js}/${justFilename}.*.js`,
                    ],
                    {
                        read: false,
                    },
                );

                return gulp
                    .src(`${paths.dist.html}/${filename}`)
                    .pipe(inject(sources, { relative: true }))
                    .pipe(gulp.dest(paths.dist.html));
            }),
    );
};

export default injectLinks;
