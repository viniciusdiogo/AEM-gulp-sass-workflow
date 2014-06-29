// curl <http path> -Ok

// master background images need to moved from
// ../
// to
// ../../master/

// User variables ** must be filled in with your data **

var userName = 'cozo002';

// Start app below

var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	lr = require('tiny-lr')(),
	rename = require('gulp-rename'),
	shell = require('gulp-shell');
	
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

// gulp.task('default', ['server', 'styles', 'watch']);
// gulp.task('default', ['server']);
gulp.task('default', ['shell']);

gulp.task('shell', function () {
	return gulp.src('*.js', {read: false})
		.pipe(shell([
			'echo hello world',
			'ls -l'
		]));
});



gulp.task('watch', function () {
	gulp.watch(repo + '/**/*.scss', function (event) {
		var path = event.path.split('\\');
		banner = path[path.length - 3];
		siteSection = path[path.length - 1].split('.')[0];
		gulp.run('styles');
	});
	gulp.watch(repo + '/shoppers/css/shoppers-homepage.css', notifyLivereload);
});

gulp.task('server', function () {
	fs.readFile('./index.html', 'utf8', function (err, data) {
		// console.log(data);
	});
	var app = express();
	app.use(express.static(__dirname));
	app.listen(8080);
	lr.listen(35729);
});

function notifyLivereload (event) {
	var fileName = path.relative(__dirname, event.path);
	lr.changed({
		body: {
			files: [fileName]
		}
	});
}