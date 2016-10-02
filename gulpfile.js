/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const bs = require('browser-sync');
const gutil = require('gulp-util');

const browserify = require('browserify');
const uglify = require('gulp-uglify');
const watchify = require('watchify');
const babelify = require('babelify');

const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');

// Used to stream bundle for further handling
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  buildTasks: ['browserify', 'sass', 'htmlmin'],
  globs: [
    { glob: 'src/**/*.html', tasks: ['htmlmin'] },
    { glob: 'src/**/*.scss', tasks: ['sass'] }
  ],
  src: 'src/**', // base directory for all source files
  dest: 'dist',  // destination for compiled files
  bundler: {
    entries: ['./src/js/main.js'],
    transform: [babelify.configure({
      presets: ['es2015', 'react']
    })],
    // Requirements of watchify
    cache: {},
    packageCache: {},
    fullPaths: true,
    dest: 'dist/js'
  }
};

config.buildTasksWatchify = (() => {
  const newArray = Array.from(config.buildTasks);
  const index = config.buildTasks.indexOf('browserify');
  newArray.splice(index, 1, 'watchify');
  return newArray;
})();

function logFrom(moduleName) {
  return (text) => gutil.log(`[${gutil.colors.cyan(moduleName)}]`, text);
}

function errorHandler(moduleName) {
  return function handler(err) {
    this.emit('end');
    logFrom(moduleName)(gutil.colors.red(err));
  };
}

function bundle(bundler) {
  return bundler.bundle()
  .on('error', errorHandler('Browserify'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  // Add transformation tasks to the pipeline here.
  .pipe(uglify())
  .on('error', gutil.log)
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.bundler.dest))
  .pipe(bs.stream());
}

gulp.task('browserify', () => {
  const bundler = browserify(config.bundler);
  bundler.on('log', logFrom('Browserify'));
  bundle(bundler);
});

gulp.task('watchify', () => {
  const bundler = watchify(browserify(config.bundler))
    .on('update', () => bundle(bundler));
  bundler.on('log', logFrom('Watchify'));
  return bundle(bundler);
});

gulp.task('watch', config.buildTasksWatchify, () => {
  config.globs.map((i) => gulp.watch(i.glob, i.tasks));
});

gulp.task('sass', () =>
  gulp.src(`${config.src}/*.scss`)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', gutil.log))
    .on('error', errorHandler('sass'))
    .pipe(gulp.dest(config.dest))
    .pipe(bs.stream()));

gulp.task('htmlmin', () =>
  gulp.src(`${config.src}/*.html`, { base: config.base })
   .pipe(htmlmin({ collapseWhitespace: true }))
   .on('error', errorHandler('htmlmin'))
   .pipe(gulp.dest(config.dest))
   .pipe(bs.stream()));

gulp.task('build', config.buildTasks);

gulp.task('live', ['watch'], () => bs.init({ server: { baseDir: 'dist' } }));

gulp.task('default', ['build']);
