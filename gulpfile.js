"use strict";

const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      pug = require('gulp-pug'),
      inheritance = require('gulp-pug-inheritance'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync');

gulp.task('styles', () => {
    return gulp.src('./src/static/stylus/index.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('./src/public/style/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('serve', () => {
    browserSync({
        server: {
			baseDir: './src'
		},
        notify: false
    });
});

gulp.task('pug', () => {
    return gulp.src('./src/static/pug/index.pug')
        .pipe(inheritance({basedir: './src/static/pug/', skip: 'node_modules'}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./src/'))
        .on('end', browserSync.reload);
});

gulp.task('watch', () => {
    gulp.watch('./src/static/stylus/**/*.styl', gulp.parallel('styles'));
    gulp.watch('./src/static/pug/**/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('styles', 'serve', 'watch'));