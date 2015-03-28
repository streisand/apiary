var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify   = require('reactify');
var sass  = require('gulp-sass');
var neat = require('node-neat');



gulp.task('default', ['js']);

gulp.task('js', function() {
  return browserify('./src/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/js'))
});

gulp.task('sass', function() {
  return gulp.src('./src/styles/**/*.scss')
  .pipe(sass({
      includePaths: neat.includePaths
    }))
  .pipe(gulp.dest('./public/css'))
})


