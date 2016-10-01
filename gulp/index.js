/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// https://www.viget.com/articles/gulp-browserify-starter-faq

const gulp = require('gulp');
const path = require('path');

module.exports = (tasks) => {
  tasks.forEach((name) => {
    gulp.task(name, require(`./${path.join('tasks', name)}`));
  });

  return gulp;
};
