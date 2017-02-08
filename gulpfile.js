var gulp      = require('gulp'),
    htmlmin   = require('gulp-htmlmin'),
    cleancss  = require('gulp-clean-css'),
    rename    = require('gulp-rename'),
    nodemon   = require('gulp-nodemon');

    gulp.task('minify-css', function(){
        return gulp.src('app/styles/*.css')
            .pipe(cleancss({keepBreaks: true}))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('app/dist/'));
    });

    gulp.task('minify-html', function(){
        return gulp.src('app/view/index.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('app/dist'));
    });

    gulp.task('start', function(callback){
         nodemon({
            script: 'app.js',
            ext: 'js html css'
        })
    });

    gulp.task('default', ['minify-css','minify-html', 'start'], function(){

    });