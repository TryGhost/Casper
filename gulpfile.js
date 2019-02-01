var gulp = require('gulp');
var pump = require('pump');

// gulp plugins and utils
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var beeper = require('beeper');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

var nodemonServerInit = function () {
    livereload.listen(1234);
};

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
}

gulp.task('build', ['css', 'js'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('generate', ['css', 'js']);

gulp.task('css', function (done) {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    pump([
        gulp.src('assets/css/*.css'),
        sourcemaps.init(),
        postcss(processors),
        sourcemaps.write('.'),
        gulp.dest('assets/built/'),
        livereload()
    ], handleError(done));
});

gulp.task('js', function (done) {
    var jsFilter = filter(['**/*.js'], {restore: true});

    pump([
        gulp.src('assets/js/*.js'),
        sourcemaps.init(),
        jsFilter,
        uglify(),
        jsFilter.restore,
        sourcemaps.write('.'),
        gulp.dest('assets/built/'),
        livereload()
    ], handleError(done));
});

gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['css']);
});

gulp.task('zip', ['css', 'js'], function (done) {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    pump([
        gulp.src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        gulp.dest(targetDir)
    ], handleError(done));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});
