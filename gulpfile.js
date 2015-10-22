// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------


var gulp = require('gulp');

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cssmin = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var scsslint = require('gulp-scss-lint');
var size = require('gulp-size');

    var themeDir = './';

    gulp.task('scss', function() {
        var onError = function(err) {
            notify.onError({
                title:    "Gulp SCSS",
                subtitle: "Uh oh! Something's not right",
                message:  "Error: <%= error.message %>",
                sound:    "Beep"
            })(err);
            this.emit('end');
        };

        return gulp.src('css/style.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(prefix())
        .pipe(rename('style.css'))
        .pipe(gulp.dest(themeDir))
        .pipe(cssmin())
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(themeDir))
    });

    gulp.task('scss-lint', function() {
        gulp.src('css/**/*.scss')
        .pipe(cache('scsslint'))
        .pipe(scsslint());
    });

    gulp.task('watch', function() {
        gulp.watch('css/**/*.scss', ['scss']);
    });

    gulp.task('default', ['scss', 'watch']);
