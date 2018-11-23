
//folder
const dir = {
	src: './src',
	dest: './dist'
}

//package
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      watch = require('gulp-watch'),
      progeny = require('gulp-progeny'),
      notify = require('gulp-notify'),
      postcss = require('gulp-postcss'),
      mqpacker = require('css-mqpacker'),
      gulpif = require('gulp-if'),
      plumber = require('gulp-plumber'),
      cache = require('gulp-cached'),
      sourcemaps = require('gulp-sourcemaps'),
      changed = require('gulp-changed'),
      autoprefixer = require('autoprefixer'),
      frontnote = require('gulp-frontnote');

//option
const compress = false; //圧縮

//SASSのコンパイル
gulp.task('sass', () => {
  return gulp.src(dir.src + '/assets/scss/style.scss')
    .pipe(progeny())
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(sourcemaps.init())
    .pipe(sass({
       outputStyle: 'compact'
    }))
    .pipe(postcss([
      mqpacker,
      autoprefixer({
        browsers: [
          'last 2 versions',
          'Explorer >= 10',
          'iOS >= 9.0',
          'Android >= 4.1']
      })
    ]))
    .pipe(gulp.dest('./'));
});

//監視対象
gulp.task('watch',() => {
  gulp.watch(dir.src + '/assets/scss/**/*.scss', ['sass']);

  gulp.watch([
    dir.dest + '/**/*.html',
    dir.dest + '/**/*.js',
    dir.dest + '/**/*.css',
    dir.dest + '/*.css',
  ]);
});

//styleguideの作成
gulp.task('guide', function() {
  return gulp.src([ dir.src + '/assets/scss/**/*.scss' ])
  .pipe(frontnote({
    overview: dir.dest + '/assets/scss/overview.md',
    out: dir.dest + '/styleguide',
    css: ['../style.css'],
    title: 'スタイルガイド'
  }))
});

//default
gulp.task('default',['watch']);
