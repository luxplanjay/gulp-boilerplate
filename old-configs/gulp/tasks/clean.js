const del = require('del');
const paths = require('../paths');

const clean = () => {
  return del(paths.clean);
};

module.exports = clean;
