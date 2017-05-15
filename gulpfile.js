var gulp = require('gulp');

// gulp plugins and utils
var csscomb = require('gulp-csscomb');
var del = require('del');
var extReplace = require('gulp-ext-replace');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var postcss = require('gulp-postcss');
var replace = require('gulp-replace');
var svgmin = require('gulp-svgmin');
var sourcemaps = require('gulp-sourcemaps');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);

    return nodemon({
        ignore: ['gulpfile.js', 'assets/', 'public/', 'cachefiles/', 'locales/']
    }).on('restart', function () {
        gulp.src('app.js')
            .pipe(livereload());
    });
};

gulp.task('build', ['css', 'icons'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('css', function () {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
    gulp.src('assets/css/*.css')
        .on('error', swallowError)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/public/'))
        .pipe(livereload());
});

gulp.task('comb', function () {
    return gulp.src('assets/css/**/*.css')
        .pipe(csscomb())
        .pipe(gulp.dest('assets/css/.'));
});

gulp.task('clean:icons', function () {
    return del(['public/icons', 'views/partials/icons/*.hbs']);
});

gulp.task('icons', ['clean:icons'], function () {
    gulp.src('assets/icons/**/*.svg')
        .pipe(replace(/#(?:[0-9a-f]{3}){1,2}/gi, 'currentColor'))
        .pipe(svgmin({
            plugins: [{
                removeDimensions: true
            }, {
                removeTitle: true
            }]
        }))
        .pipe(gulp.dest('public/icons'))
        .pipe(extReplace('.hbs'))
        .pipe(gulp.dest('views/partials/icons'))
        .on('end', function () {
            livereload.reload();
        });
});

gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['css']);
    gulp.watch('assets/icons/**/*.svg', ['icons']);
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});
