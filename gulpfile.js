var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify   = require('reactify');


gulp.task('default', ['js']);

gulp.task('js', function() {
  return browserify('./src/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'))
});
