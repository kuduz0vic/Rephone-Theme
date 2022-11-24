const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));

gulp.task('sass', function(){
    return gulp.src('styles/*.scss')
    .pipe(sass({ includePaths : ['_/sass/'] }))
    .pipe(gulp.dest('shopify/assets'))
});

gulp.task('watch', function(){
    gulp.watch('styles/**/*.scss', gulp.series('node-sas'));
})