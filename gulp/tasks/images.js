const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');
const paths = require('../paths');

const images = () => {
  return src(paths.src.images)
    .pipe(newer(paths.build.images))
    .pipe(
      imagemin([
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(size({ showFiles: true }))
    .pipe(dest(paths.build.images));
};

module.exports = images;

// const imagesOld = () => {
//   return src(['src/images/**/*.{png,jpg,jpeg,svg}', '!src/images/icons/**/*'])
//     .pipe(
//       imagemin([
//         imagemin.jpegtran({ progressive: true }),
//         imagemin.optipng({ optimizationLevel: 5 }),
//         imagemin.svgo({
//           plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
//         }),
//       ]),
//     )
//     .pipe(dest('build/images'));
// };
