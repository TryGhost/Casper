var gulp = require('gulp');

var sass = require('gulp-sass'),
	autoprefix = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify');


// Stylesheets

gulp.task('sass', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefix('last 2 versions'))
		.pipe(gulp.dest('./assets/css'))
		.pipe(notify({ message: 'Stylesheet build task complete' }));
});

// Javascript
gulp.task('jshint', function () {
	gulp.src('./assets/js/*')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Images

gulp.task('imagemin', function () {
	gulp.src('./assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest(''))
		.pipe(notify({ message: 'Image minification task complete' }));
});


gulp.task('default', function() {

	// Watch sass files
	gulp.watch('./assets/sass/**/*.scss', ['sass']);

	// Watch js files
	gulp.watch('./assets/scripts/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('./assets/images/**/*', ['imagemin']);

});