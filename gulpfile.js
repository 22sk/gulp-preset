/* eslint-disable import/no-extraneous-dependencies */

// https://www.viget.com/articles/gulp-browserify-starter-faq
const gulp = require('./gulp')(
  ['browserify', 'watchify', 'htmlmin', 'watch-all', 'sass']
);

/*
 * to add new tasks, create a js file in gulp/tasks and it the file name to
 * the array above
 */

gulp.task('live', ['watchify', 'watch-all']);
gulp.task('build', ['browserify', 'htmlmin', 'sass']);
gulp.task('default', ['build']);
