var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['mystyle'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('sass/**/*.scss',['mystyle']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.php").on('change',browserSync.reload);
    gulp.watch("js/**/*.js").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('mystyle', function() {
    	 return gulp.src('sass/**/*.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))	//log compilation errors
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('js/**/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))
        .pipe(browserSync.stream());
});

gulp.task('js-watch', ['js'], browserSync.reload);

gulp.task('default', ['serve']);

gulp.task('js', function () {
    return gulp.src('js/*js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

