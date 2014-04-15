// var gulp = require('gulp'),
// 	watch = require('gulp-watch'),
// 	sass = require('gulp-sass'),
// 	cache = require('gulp-cache');

// 	gulp.task('default', ['watch']);
// 	gulp.task('watch', function() {
// 		gulp.watch('assets/sass/**', ['sass']);
// 	});

	// gulp.task('sass', function() {
	// 	gulp.src('assets/sass/app.scss')
	// 	.pipe(sass({
	// 		noCache: false,
	// 		style: 'expanded',
	// 		lineNumbers: true,
	// 		sourcemap: false,
	// 		quiet: true,
	// 		includePath: 'assets/sass/'
	// 	}))
	// 	.pipe(gulp.dest('assets/css'));
	// });


var gulp = require('gulp');
var sass = require('gulp-sass')








gulp.task('sass', function () {
	gulp.src('./assets/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./assets/css'));
});