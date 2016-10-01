const gulp = require('gulp');
const server = require('../server');
const config = require('../../gulpconfig');

module.exports = () => {
  const bs = server();
  const watchers = config.globs.map((i) => gulp.watch(i.glob, i.tasks));
  watchers.forEach((watcher) => watcher.on('change', () => bs.reload()));
};
