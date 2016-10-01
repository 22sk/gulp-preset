const gulp = require('gulp');
const gutil = require('gulp-util');

const browserify = require('browserify');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

// Used to stream bundle for further handling
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../../gulpconfig');
const server = require('../server');

module.exports = () => {
  const bs = server(); // eslint-disable-line global-require
  const watcher = watchify(browserify(config.browserify));

  function build() {
    gutil.log('Building');
    watcher.bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.browserify.dest))
      .pipe(bs.stream({ once: true }));
  }

  build();

  return watcher.on('update', build);
};
