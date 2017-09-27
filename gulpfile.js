var gulp = require('gulp');
var uglify = require('gulp-uglify');//压缩js
var cleanCSS = require('gulp-clean-css');//压缩css
var pump = require('pump');
var useref = require('gulp-useref');//css、js合并成一个文件
var inlinesource = require('gulp-inline-source');//css、js内联
var rev = require('gulp-rev-append-all');//去缓存

gulp.task('default',function(cb){
	gulp.start('compress');
});
gulp.task('compress',function(cb){
	pump([
		gulp.src('./src/js/*.js'),
		uglify(),
		gulp.dest('./dist/js')
	],
	cb);
});
gulp.task('minify-css',function(cb){
	return gulp.src('./src/css/*.css')
		.pipe(cleanCSS({compatibility:'ie8'}))
		.pipe(gulp.dest('./dist/css'))
});
//css/js合并成一个css或者js文件
gulp.task('useref',function(cb){
	return gulp.src('./src/*.html')
		.pipe(useref())
		.pipe(gulp.dest('./dist'));
});
//css、js的内联
gulp.task('inlinesource',function(){
	return gulp.src('./src/*.html')
		.pipe(inlinesource())
		.pipe(gulp.dest('./dist'))
});
gulp.task('rev',function(){
	gulp.src('./src/*.html')
		.pipe(rev())
		.pipe(gulp.dest('./dist'))
})