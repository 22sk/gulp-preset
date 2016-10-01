const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const config = require('../../gulpconfig');

module.exports = () => gulp.src(`${config.src}/*.html`, { base: config.base })
 .pipe(htmlmin({ collapseWhitespace: true }))
 .pipe(gulp.dest(config.dest));
