var gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('default', function(){
  return gulp.src('./src/js/index.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./dist/js/index.js'));
})