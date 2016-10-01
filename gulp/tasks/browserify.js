const gulp = require('gulp');
const gutil = require('gulp-util');

const browserify = require('browserify');
const uglify = require('gulp-uglify');

// Used to stream bundle for further handling
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../../gulpconfig');


module.exports = () => {
  const bundler = browserify(config.browserify);

  return bundler.bundle()
    .on('error', function error(err) {
      gutil.log(err.message);
      gutil.log(gutil.colors.yellow('Please remove unneeded JavaScript ' +
        'entry files from the Browserify configuration in gulpfile.js.'));
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.browserify.dest));
};
