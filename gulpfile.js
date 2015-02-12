// gulp & utils
var gulp = require('gulp');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;

// gulp plugins
var copy = require('gulp-copy');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

// browserify
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nwBundler = browserify('./src/js/app.js', {
  insertGlobals: false,
  detectGlobals: false,
  builtins: []
});
var browserBundler = browserify('./src/js/app.js');

var path = {
  scss: 'src/scss/app.scss',
  styles: [
    'src/vendor/animate.css/animate.css',
    'src/vendor/mdi/materialdesignicons.css',
    'dist/css/app.css'
  ],
  fonts: {
    icon: 'src/vendor/mdi/fonts/*',
    web: 'src/fonts/**/*.woff'
  },
  images: {
    loaders: 'src/vendor/svg-loaders/svg-loaders/*.svg'
  }
};

// node webkit
var nwProc;

// compile js with browserify
gulp.task('scripts', bundle.bind(null, nwBundler, 'app.js'));
gulp.task('scripts-browser', bundle.bind(null, browserBundler, 'app-browser.js'));

// compile view templates with jade
gulp.task('views', function () {
  return gulp.src(['src/views/{index.jade,templates/**/*.jade}'])
    .pipe(jade({
      locals: {
        dev: (process.env.NODE_ENV !== 'production'),
        nw: true
      }
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

// Recompile views for browser dev (outside nw)
gulp.task('views-browser', function () {
  return gulp.src(['src/views/{index.jade,templates/**/*.jade}'])
    .pipe(jade({
      locals: {
        dev: (process.env.NODE_ENV !== 'production'),
        nw: false
      }
    }))
    .pipe(rename(function(path) {
      path.basename += '-browser';
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

// compile css with sass
gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

// combine compiled sass with plain css
gulp.task('styles', ['scss'], function () {
  return gulp.src(path.styles)
    .pipe(concat('app.css'))
    .pipe(replace(/\(fonts\//g, '(../fonts/'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

// copy icon fonts
gulp.task('icon-fonts', function () {
  return gulp.src(path.fonts.icon)
    .pipe(copy('dist/fonts', {prefix: 4}));
});

// copy web fonts
gulp.task('web-fonts', function () {
  return gulp.src(path.fonts.web)
    .pipe(copy('dist/fonts', {prefix: 2}));
});

// watch for source changes
gulp.task('watch', ['default'], function () {
  // watchify(bundler).on('update', bundle);
  livereload.listen();

  gulp.watch('src/js/**/*.js', ['scripts', 'scripts-browser']);
  gulp.watch('src/views/**/*.jade', ['views', 'views-browser']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('nw-dev', ['watch'], function() {
  launchNw();
});

gulp.task('browser-dev', ['watch'], function() {
  gulp.src('dist')
  .pipe(webserver({
    // This puts us in html5Mode (pushState)
    fallback: 'index-browser.html',
    port: 25625,
    open: 'http://localhost:25625/index-browser.html'
  }));
});

gulp.task('default', [
  'styles', 
  'views', 
  'views-browser', 
  'scripts', 
  'scripts-browser', 
  'web-fonts',
  'icon-fonts',
], function () {
  return gulp.src('src/images/*')
    .pipe(copy('dist/images', {prefix: 2}));
});

function launchNw() {
  if (nwProc) {
    nwProc.kill();
  }
  nwProc = spawn('./nw/nw', [
    '--enable-transparent-visuals', 
    '--disable-gpu', 
    '.'
  ], {
    // stdio: 'inherit'
  });
}

function bundle(bundler, fileName) {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(fileName))
    .pipe(replace(/\%WS_PORT\%/g, process.env.WS_PORT || '56573'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
}
