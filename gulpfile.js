var gulp = require('gulp'),
    less = require('gulp-less'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('default', ['clean'], function(){
  return gulp.start('scripts', 'styles', 'html', 'watch');
})

gulp.task('clean', function(){
  return del('./dist/');
})

gulp.task('scripts', function(){
  return gulp.src('./src/js/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('styles', function(){
  return gulp.src('./src/css/index.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', function(){
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function(){

  gulp.watch('./src/js/*.js', ['scripts']);

  gulp.watch('./src/css/{,*/}*.less', ['styles']);

  gulp.watch('./src/*.html', ['html']);
})