const bs = require('browser-sync');

let server = null;

module.exports = () => server || (server = bs.init({
  server: {
    baseDir: 'dist'
  }
}));
