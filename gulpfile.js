var gulp = require('gulp'),
	sass = require('gulp-ruby-sass')
	// autoprefixer = require('gulp-autoprefixer'),
	// minifycss = require('gulp-minify-css'),
	// jshint = require('gulp-jshint'),
	// uglify = require('gulp-uglify'),
	// rename = require('gulp-rename'),
	// clean = require('gulp-clean'),
	// concat = require('gulp-concat'),
	// cache = require('gulp-cache'),
	// livereload = require('gulp-livereload'),
	// shell = require('gulp-shell'),
	// nd = require('gulp-nodemon'),
	// watch = require('gulp-watch'),
	// filter = require('gulp-filter')
	;
	
var http = require('http'),
	fs = require('fs');

var repo = '/Users/cozo002/workspace/svu-banners-cq5/components/src/main/content/jcr_root/etc/designs/svubanners';

var banner;
var siteSection;

gulp.task('styles', function() {
	return gulp.src(repo + '/' + banner + '/css/' + banner + '-' + siteSection + '.scss')
		.pipe(sass({
			style: 'expanded',
			sourcemap: true
		}))
		// .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		// .pipe(rename({suffix: '.min'}))
		// .pipe(minifycss())
		.pipe(gulp.dest(repo + '/' + banner + '/css'));
});

gulp.task('default', ['server', 'watch-styles']);

gulp.task('watch-styles', function () {
	gulp.watch(repo + '/**/*.scss', function (event) {
		var path = event.path.split('\\');
		banner = path[path.length - 3];
		siteSection = path[path.length - 1].split('.')[0];
		gulp.run('styles');
	});
});

// gulp.task('watch', function() {
// 	var server = livereload();
// 	gulp.watch(['styles']).on('change', function(file) {
// 		server.changed(file.path);
// 	});
// });

// curl <http path> -Ok

gulp.task('server', function () {
	return fs.readFile('dev/index.html', function (err, html) {
		if (err) {
			throw err; 
		}

		http.createServer(function(req, res) {
			console.log('req made');
			if (req.url.length === 1) {
				res.writeHeader(200, {"Content-Type": "text/html", "Last-Modified": new Date()});  
				res.write(html);
				res.end();
				console.log('response written');
			}
		}).listen(8080);
	});
});