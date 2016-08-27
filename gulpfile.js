var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 20 versions'] });

gulp.task('watch', function() {
    gulp.watch('./*/less/*.less', ['less']);
    gulp.watch('./*/babel/*.js', ['babel']);
});

gulp.task('less', function() {
    return gulp.src('./*/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(less({ plugins: [autoprefix] }))
        .on('error', function(e) {})
        .pipe(rename(function(path){
            path.dirname += '/../css';
            return path;
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('babel', () => {
    console.log('babel...');
    return gulp.src('./*/babel/*.js')
        .pipe(plumber())
        .pipe(babel({presets: ['es2015']}))
        .pipe(rename(function(path){
            path.dirname += '/../js';
            return path;
        }))
        .pipe(gulp.dest('./'));
});

// 静态服务器
gulp.task('browser-sync', ['watch'], function() {
    // 监听HTML更改事件并重新加载
    browserSync.watch(['**/*.html','./*/js/*.js'], { ignored: './node_modules/*' }).on("change", browserSync.reload);

    // 提供一个回调来捕获所有事件的CSS 
    // files - 然后筛选的'change'和重载所有
    // css文件在页面上
    browserSync.watch('./*/css/*.css', { ignored: './node_modules/*' }, function(event, file) {
        if (event === "change") {
            browserSync.reload("*.css");
        } else {
            browserSync.reload();
        }
    });

    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 1234
    });
});

gulp.task('init', ['browser-sync', 'less', 'babel'])
gulp.task('default', ['init']);