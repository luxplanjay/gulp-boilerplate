const { src, dest } = require('gulp');
const paths = require('../paths');

const fonts = () => {
  return src(paths.src.fonts).pipe(dest(paths.build.fonts));
};

module.exports = fonts;
