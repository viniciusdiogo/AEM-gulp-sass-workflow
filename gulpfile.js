// User variables ** must be filled in with your data **

var userName = 'cozo002';

// Start app below

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	express = require('express'),
	lr = require('tiny-lr')(),
	path = require('path');
	
var http = require('http'),
	fs = require('fs');

var repo = '/Users/' + userName + '/workspace/svu-banners-cq5/components/src/main/content/jcr_root/etc/designs/svubanners';

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
		// console.log(banner);
		// console.log(siteSection);
		gulp.run('styles');
	});
	// gulp.watch(repo + '/**/*.css', notifyLivereload);
	gulp.watch(repo + '/shoppers/css/shoppers-homepage.css', notifyLivereload);
});

// gulp.task('watch', function() {
// 	var server = livereload();
// 	gulp.watch(['styles']).on('change', function(file) {
// 		server.changed(file.path);
// 	});
// });

// curl <http path> -Ok

gulp.task('server', function () {
	fs.readFile('./index.html', 'utf8', function (err, data) {
		console.log(data);
	});
	var app = express();
	app.use(express.static(__dirname));
	app.listen(8080);
	lr.listen(35729);
});

function notifyLivereload (event) {
	var fileName = path.relative(__dirname, event.path);
	console.log(fileName);
	lr.changed({
		body: {
			files: [fileName]
		}
	});
}

// ../../master/

// ../