const sass = require('gulp-sass');
const gulp = require('gulp');
const config = require('../../gulpconfig');
const gutil = require('gulp-util');

module.exports = () => gulp.src(`${config.src}/*.scss`)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', gutil.log))
    .pipe(gulp.dest(config.dest));
