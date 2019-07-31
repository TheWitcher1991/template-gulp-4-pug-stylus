"use strict";

const gulp         = require('gulp'),
      stylus       = require('gulp-stylus'),
      pug          = require('gulp-pug'),
      inheritance  = require('gulp-pug-inheritance'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync  = require('browser-sync'),
      path         = require('path');  

const src = path.join(__dirname, './src/')

const PATHS_task = {
    style: {
        src: `${src}static/stylus/index.styl`,
        dest: `${src}/public/style/`,
        all: `${src}static/stylus/**/*.styl`,
    },
    pug: {
        src: `${src}static/pug/index.pug`,
        base: `${src}static/pug/`,
        dest: src,
        all: `${src}static/pug/**/*.pug`
    }
}

gulp.task('styles', () => {
    return gulp.src(PATHS_task.style.src)
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest(PATHS_task.style.dest))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('serve', () => {
    browserSync({
        server: {
			baseDir: src
		},
        notify: false
    });
});

gulp.task('pug', () => {
    return gulp.src(PATHS_task.pug.src)
        .pipe(inheritance({basedir: PATHS_task.pug.base, skip: 'node_modules'}))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(PATHS_task.pug.src))
        .on('end', browserSync.reload);
});

gulp.task('watch', () => {
    gulp.watch('./src/static/stylus/**/*.styl', gulp.parallel('styles'));
    gulp.watch('./src/static/pug/**/*.pug', gulp.parallel('pug'));
});

gulp.task('default', gulp.parallel('styles', 'serve', 'watch'));