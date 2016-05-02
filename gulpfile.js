'use strict';

var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	rimraf = require('gulp-rimraf'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	libsPath = 'assets/libs/'
;


// Clean task
gulp.task('clean', function() {
	gulp.src('./dist', { read: true }) // much faster
  .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  // application styles
  gulp.src('assets/less/*.less')
	  // The onerror handler prevents Gulp from crashing when you make a mistake in your LESS
	  .pipe(less({onError: function(e) { console.log(e); } }))
	  .pipe(minifyCSS())
	  .pipe(concat('style.min.css'))
	  .pipe(gulp.dest('dist/css'))
  ;

  // vendor styles
  gulp.src([
  	libsPath + 'jqueryui/ui-lightness/jquery-ui-1.10.4.custom.min.css',
  	libsPath + 'bootstrap/css/bootstrap.min.css',
  	libsPath + 'font-awesome/css/font-awesome.min.css',
  	libsPath + 'fontello/css/fontello.css',
  	libsPath + 'animate-css/animate.min.css',
  	libsPath + 'nifty-modal/css/component.css',
  	libsPath + 'magnific-popup/magnific-popup.css"',
  	libsPath + 'ios7-switch/ios7-switch.css"',
  	libsPath + 'pace/pace.css',
  	libsPath + 'sortable/sortable-theme-bootstrap.css',
  	libsPath + 'jquery-icheck/skins/all.css',
		libsPath + 'themify-icons/themify-icons.css',
		libsPath + 'themify-icons/ie7/ie7.css',
		libsPath + 'morrischart/morris.css',
		libsPath + 'jquery-notifyjs/styles/metro/notify-metro.css',
		libsPath + 'jquery-easypiechart/jquery.easy-pie-chart.css'
  ])
	  .pipe(minifyCSS())
	  .pipe(concat('vendor.min.css'))
	  .pipe(gulp.dest('dist/css'))
  ;

	// jquery-icheck skins
	gulp.src([libsPath + 'jquery-icheck/skins/**/*.png'])
		.pipe(gulp.dest('dist/css'))
	;


  // fonts
  gulp.src([
    libsPath + 'font-awesome/font*/*',
    libsPath + 'fontello/font*/*',
		libsPath + 'themify-icons/font*/*',
		libsPath + 'amcharts*/images*/*'
  ])
    .pipe(gulp.dest('dist'))
  ;
});

gulp.task('vendorjs', function(){
	gulp.src([
		'app/shims/string.js',
		libsPath + 'jquery/jquery-1.11.1.min.js',
		libsPath + 'bootstrap/js/bootstrap.min.js',
		libsPath + 'jqueryui/jquery-ui-1.10.4.custom.min.js',
		libsPath + 'jquery-ui-touch/jquery.ui.touch-punch.min.js',
		libsPath + 'jquery-detectmobile/detect.js',
		libsPath + 'jquery-animate-numbers/jquery.animateNumbers.js',
		libsPath + 'ios7-switch/ios7.switch.js',
		libsPath + 'fastclick/fastclick.js',
		libsPath + 'jquery-blockui/jquery.blockUI.js',
		libsPath + 'bootstrap-bootbox/bootbox.min.js',
		libsPath + 'jquery-slimscroll/jquery.slimscroll.js',
		libsPath + 'jquery-sparkline/jquery-sparkline.js',
		libsPath + 'nifty-modal/js/classie.js',
		libsPath + 'nifty-modal/js/modalEffects.js',
		libsPath + 'sortable/sortable.min.js',
		libsPath + 'bootstrap-fileinput/bootstrap.file-input.js',
		libsPath + 'bootstrap-select/bootstrap-select.min.js',
		libsPath + 'bootstrap-select2/select2.min.js',
		libsPath + 'magnific-popup/jquery.magnific-popup.min.js',
		libsPath + 'pace/pace.min.js',
		libsPath + 'jquery-icheck/icheck.min.js',
		libsPath + 'themify-icons/ie7/ie7.js',
		libsPath + 'raphael/raphael-min.js',
		libsPath + 'morrischart/morris.min.js',
		libsPath + 'highcharts-4.1.9/highcharts.js',
		libsPath + 'highcharts-4.1.9/highcharts-more.js',
		libsPath + 'highcharts-4.1.9/modules/treemap.js',
		libsPath + 'highcharts-4.1.9/modules/exporting.js',
		libsPath + 'highmaps-1.1.9/modules/map.js',
		libsPath + 'highmaps-1.1.9/modules/data.js',
		libsPath + 'highmaps-1.1.9/mapdata/world-highres3.js',
		libsPath + 'jquery-easypiechart/jquery.easypiechart.min.js',
		libsPath + 'bootstrap-xeditable/js/bootstrap-editable.min.js',
		'assets/js/init.js',
		libsPath + 'jquery-notifyjs/notify.min.js',
		libsPath + 'jquery-notifyjs/styles/metro/notify-metro.js',
		libsPath + 'jquery-wizard/jquery.easyWizard.js',
		libsPath + 'jquery-file-upload/js/jquery.iframe-transport.js',
		libsPath + 'jquery-file-upload/js/jquery.fileupload.js',
		libsPath + 'moment-js/moment.min.js',
		libsPath + 'typeaheadjs/typeahead.js',
		libsPath + 'amcharts/amcharts.js',
		libsPath + 'amcharts/serial.js',
		libsPath + 'amcharts/pie.js',
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('dist/js'))
	;
});

gulp.task('images', function(){
	gulp.src(['assets/img/**/*'])
		.pipe(gulp.dest('dist/img'))
	;

  gulp.src(['assets/images/**/*'])
    .pipe(gulp.dest('dist/images'))
  ;
})

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/main.js'])
  .pipe(browserify({
  	// insertGlobals: true,
  	debug: true,
    transform: 'hbsfy'
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));
});

gulp.task('watch', ['lint'], function() {
  // Start live reload
  // refresh.listen(livereloadport);

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/*.js', 'app/**/*.js', 'app/*.hbs', 'app/**/*.hbs'],[
		'lint',
		'browserify'
  ]);
  // Watch our less files
  gulp.watch(['assets/**/*.less'], [
		'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
		'views'
  ]);

	gulp.watch(['assets/js/init.js'], [
		'vendorjs'
	]);

  // gulp.watch('./dist/**').on('change', refresh.changed);

});

gulp.task('environment', function(){
	gulp.src([
		'assets/environment/variables.js'
	])
	.pipe(concat('environment.js'))
	.pipe(gulp.dest('dist/js'))
	;
});

// Dev task
gulp.task('dist', ['clean', 'views', 'images', 'styles', 'vendorjs', 'lint', 'browserify'], function() { });
gulp.task('dev', ['dist', 'environment'], function() { });
gulp.task('default', ['dev', 'watch']);
