var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	shell = require('gulp-shell'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	jssourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util');

gulp.task('default', ['watch']);

var fileName;

var beepError = function (err) {
	gutil.beep();
	console.log(err);
}

// Watch events

gulp.task('watch', function () {
	livereload.listen();

	gulp.watch('path/to/scss-folder/*.scss', function (event) {
		var path = event.path.split('\\');  // windows here obviously, osx will be different and frankly has not been tested with this app.
		fileName = path[path.length - 1];
		gulp.start('curl-vault-css');  // if you have only one main/master CSS file you can switch this to look like the JS task.
	});

	gulp.watch('path/to/*.js', ['javascripts']);
});

// Styles tasks

gulp.task('styles', function() {
	return gulp.src('path/to/scss-folder/' + fileName)
		.pipe(plumber({
			errorHandler: beepError
		}))
		.pipe(sass({
			style: 'compressed',  // cannot gulp-minify css with sourcemaps as of time of writing but this is ~10% larger.
			sourcemap: true,
			sourcemapPath: 'path/to/scss-folder/'
		}))
		.pipe(gulp.dest('path/to/css-folder/'));
});

gulp.task('curl-vault-css', ['styles'], function () {
	return gulp.src('')
		.pipe(plumber({
			errorHandler: beepError
		}))
		.pipe(shell([
			'curl -u admin:admin -s -T ' + fileName + ' http://localhost:4503/path/to/css-folder/' + fileName,  
			'curl -u admin:admin -s -T ' + fileName + '.map' + ' http://localhost:4503/path/to/css-folder/' + fileName + '.map'
		], {cwd: 'path/to/css-folder/'}))
		.pipe(notify({
			onLast: true,
			title: 'CSS complete',
			message: ' ',
			icon: path.join(__dirname, "growl-icons/css.jpg")
		}))
		.pipe(livereload());
});


// Javascript tasks

gulp.task('javascripts', function () {  // assumes one master JS file
	return gulp.src('path/to/js-folder/*.js')
		.pipe(plumber({
			errorHandler: beepError
		}))
		.pipe(jssourcemaps.init())
		.pipe(concat('combined-general.js'))
		.pipe(uglify())
		.pipe(jssourcemaps.write())
		.pipe(gulp.dest('path/to/js-folder/'))  // inside of JCR
		.pipe(shell([
			'curl -u admin:admin -s -T combined-general.js http://localhost:4503/path/to/js-folder/combined-general.js'
		], {cwd: 'path/to/js-folder/'}))
		.pipe(notify({
			onLast: true,
			title: 'Javascripts complete',
			message: ' ',
			icon: path.join(__dirname, "growl-icons/js.png")
		}))		
		.pipe(livereload());
});


// build scripts

gulp.task('build-publish', function () {
	return gulp.src('')
		.pipe(shell([
			'mvn clean install -Dcrx.url=http://localhost:4503 -Dsling.install.skip=true -Dcq5.install.skip=false'
		], {cwd: '../your-main-AEM-repository/'}));
});

gulp.task('build-publish-3rdpartyjars', function () {
	return gulp.src('')
		.pipe(shell([
			'mvn clean install sling:install -Dcrx.url=http://localhost:4503 -Dsling.install.skip=false'
		], {cwd: '../your-main-AEM-repository/'}));
});

gulp.task('build-author', function () {
	return gulp.src('')
		.pipe(shell([
			'mvn clean install -Dsling.install.skip=true -Dcq5.install.skip=false'
		], {cwd: '../your-main-AEM-repository/'}));
});

gulp.task('build-author-3rdpartyjars', function () {
	return gulp.src('')
		.pipe(shell([
			'mvn clean install sling:install -Dsling.install.skip=false'
		], {cwd: '../your-main-AEM-repository/'}));
});