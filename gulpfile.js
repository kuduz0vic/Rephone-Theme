const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function(){
    return gulp.src('styles/*.scss')
    .pipe(sass({ includePaths : ['_/sass/'] }))
    .pipe(gulp.dest('assets'))
});

gulp.task('watch', function(){
    gulp.watch('styles/**/*.scss', gulp.series('sass'));
})

var gulpSass = require('gulp-sass'); 
gulp.task('compile-sass', function () {
  gulp.src('./wwwroot/lib/bootstrap/scss/bootstrap.scss')   
  .pipe(gulpSass()) .pipe(gulp.dest('assets')); 
  });