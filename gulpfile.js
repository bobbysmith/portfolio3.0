const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const SRC = {
  scripts: 'src/scripts/*.js',
  styles: 'src/scss/*.scss',
  fonts: 'src/fonts/**.*'
};

const DIST = {
  scripts: 'dist/scripts',
  styles: 'dist/css',
  fonts: 'dist/fonts',
};

gulp.task('browser-sync', ['styles', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('styles', () => {
  return gulp.src(SRC.styles)
    .pipe(sass())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST.styles))
    .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
  return gulp.src(SRC.fonts)
    .pipe(gulp.dest(DIST.fonts));
});

gulp.task('scripts', () => {
  return gulp.src(SRC.scripts)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(DIST.scripts))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch(SRC.scripts, ['scripts']);
  gulp.watch(SRC.styles, ['styles']);
});

gulp.task('default', ['browser-sync', 'styles', 'fonts', 'scripts', 'watch']);
