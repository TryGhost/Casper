var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var colorRgbaFallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var vmin = require('postcss-vmin');
var pixrem = require('pixrem');
var willChange = require('postcss-will-change');
var sass = require('gulp-sass');
var path = require('path');
var cssnano = require('cssnano');
var zindex = require('postcss-zindex');
var removeComments = require('postcss-discard-comments');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var fs = require('fs');

// Define base folders
var asset_src = 'assets/';
var npm_src   = 'node_modules/';
var dest      = 'assets/';

var onError = function( err ) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
};

// gulp.task('fonts', function() {
//   return gulp
//     .src([
//       npm_src + 'feather-icons/dist/feather-sprite.svg'
//     ])
//     .pipe(gulp.dest(dest + 'icons'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp
    .src([
      npm_src   + 'lunr/lunr.js',
      npm_src   + 'vanilla-lazyload/dist/lazyload.js',
      npm_src   + 'fitvids/fitvids.js',
      asset_src + 'js/scripts/ghostHunter.js',
      asset_src + 'js/scripts/prism.js',
      asset_src + 'js/scripts/script.js'
    ])
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + 'js'))
    .pipe(notify({
      title: 'Javascript',
      message: 'JS compiled and minified!'
    }));
});

// Css processors
var processors = [
  removeComments,
  cssnext({
    browsers:'> 1%, last 10 version, Firefox >= 30, ie >= 10',
    warnForDuplicates: false
  }),
  zindex,
  willChange,
  colorRgbaFallback,
  opacity,
  pseudoelements,
  vmin,
  cssnano
];

// Build styles from sass
gulp.task('sass', function () {
  return gulp
    .src(asset_src + '/sass/app.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(replace('@charset "UTF-8";', ''))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest + 'css'));
});

gulp.task('inlinecss', function() {
  return gulp.src(['partials/inline-css.hbs'])
  .pipe(replace('@@compiled_css', fs.readFileSync('assets/css/app.min.css')))
  .pipe(gulp.dest('partials/compiled'))
  .pipe(notify({
    title: 'CSS',
    message: 'CSS compiled and inlined!'
  }));
});

// Browsersync init and reload
gulp.task('browsersync', function (callback) {
  browserSync.init({
    port: 3368,
    proxy: 'http://localhost:2368/'
  });
  callback();
});

gulp.task('browsersync:reload', function (callback) {
  browserSync.reload();
  callback();
});

// Watch for changes in files
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(asset_src + 'js/scripts/*.js', ['scripts']);
  // Watch .scss files
  gulp.watch(asset_src + 'sass/*/*.scss', ['sass']);
  // Watch app.min.css
  gulp.watch(asset_src + 'css/app.min.css', ['inlinecss']);
  // Watch app.min.css
  gulp.watch(asset_src + 'css/app.min.css', ['browsersync:reload']);
  // Watch app.min.js
  gulp.watch(asset_src + 'js/app.min.js', ['browsersync:reload']);
  // Watch .hbs files
  gulp.watch('**/*.hbs', ['browsersync:reload']);
});

// Default Task
gulp.task('default', ['sass', 'inlinecss', 'scripts', 'watch', 'browsersync']);
