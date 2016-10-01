/* eslint-disable import/no-extraneous-dependencies */

const babelify = require('babelify');

module.exports = {
  // options object for browserify
  browserify: {
    entries: ['./src/js/main.jsx'],
    transform: [babelify.configure({
      presets: ['es2015', 'react']
    })],
    // Requirements of watchify
    cache: {},
    packageCache: {},
    fullPaths: true,
    dest: 'dist/js'
  },
  src: 'src/**', // base directory for all source files
  dest: 'dist',  // destination for compiled files

  // defines which gulp tasks to execute when file matching given glob changes
  globs: [
    { glob: 'src/**/*.html', tasks: ['htmlmin'] },
    { glob: 'src/**/*.scss', tasks: ['sass'] }
  ]
};
