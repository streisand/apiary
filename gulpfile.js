var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify   = require('reactify');
var nodemon    = require('gulp-nodemon');
var connect    = require('gulp-connect');
var reload     = connect.reload;
var sass       = require('gulp-sass');
var neat       = require('node-neat');

gulp.task('default', ['js', 'sass', 'fonts', 'connect', 'nodemon', 'watch']);


gulp.task('js', function() {
  return browserify('./src/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(reload());
});

gulp.task('sass', function() {
  gulp.src('src/styles/**/*.scss')
    .pipe(sass({
      includePaths: neat.includePaths
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(reload());
});

gulp.task('fonts', function() {
  gulp.src('./bower_components/semantic-ui-icon/assets/fonts/*')
    .pipe(gulp.dest('public/css/assets/fonts/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'src/**/*.*',
    livereload: true
  });
});

gulp.task('nodemon', function() {
  return nodemon({script: './bin/www'});

});
