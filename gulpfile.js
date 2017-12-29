var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin');

var sassSources = ['scss/sitewide.scss'],
    jsSources = ['scripts/*.js'],
    vendorSources = ['scripts/vendor/*.js'],
    viewSources = ['views/*.html'],
    htmlSources = ['**/*.html', '!views/*.html', '!public/**/*.html', '!node_modules/**/*.html'],
    publicHtmlSources = ['./public/**/*.html', '!./public/views/*.html', '!./public/node_modules/**/*.html'],
    outputDir = 'public';

gulp.task('log', function() {
    gutil.log('== It"s big, it"s heavy, it"s wood! ==')
});

gulp.task('copy', function() {
    gulp.src(htmlSources)
        .pipe(gulp.dest(outputDir, {overwrite: true}))
    gulp.src(vendorSources)
        .pipe(gulp.dest(outputDir + '/vendor/', {overwrite: true}))
    gulp.src(viewSources)
        .pipe(gulp.dest(outputDir + '/views/', {overwrite: true}))
});

gulp.task('sass', function() {
    gulp.src(sassSources)
        .pipe(sass({outputStyle: 'compressed', includePaths: ['./scss']}))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('sitewide.js'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('inject', function() {
    var target = gulp.src(publicHtmlSources);
    var sources = gulp.src(['./public/vendor/*.js', './public/*.js', './public/sitewide.css'], { read: false });
    return target.pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest('./public'));
});

gulp.task('images', function() {
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/'))
});

gulp.task('watch', function() {
    gulp.watch('scripts/*.js', ['js']);
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('connect', function() {
    connect.server({
        root: './public',
        livereload: true
    })
});

gulp.task('html', function() {
    gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'sass', 'copy', 'images', 'inject', 'connect', 'watch']);