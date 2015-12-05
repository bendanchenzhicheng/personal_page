var gulp = require('gulp'),
    server = require('gulp-server-livereload'),
    sass = require('gulp-ruby-sass'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    del = require('del');
    // rjs = require('gulp-requirejs');

gulp.task('sass', function () {
    return sass('app/.scss/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('app/css'));
});

gulp.task('server', function() {
    gulp.src('app')
        .pipe(server({
          port: 8085,
          livereload: true,
          directoryListing: false,
          open: true,
          defaultFile: 'index.html'
        }));
});

gulp.task('watch:sass', function(){
    gulp.watch('app/.scss/*.scss', ['sass'])
});

gulp.task('watch', ['server', 'watch:sass']);
  
gulp.task('default', function() {
});

gulp.task('htmlmin', function() {
    return gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('cssmin', function () {
    gulp.src('app/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('jsmin', function() {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
    del(['dist/css', 'dist/js', 'dist/*.html']);
});

gulp.task('compress', ['htmlmin', 'cssmin', 'jsmin']);