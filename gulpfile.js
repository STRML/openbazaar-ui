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
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');


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

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function(callback) {
  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

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
