var _ = require('underscore');
var browserify = require('browserify');
var browserifyInc = require('browserify-incremental');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var glob = require('glob');
var jasmineBrowser = require('gulp-jasmine-browser');
var babelify = require('babelify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var removeFiles = require('gulp-remove-files');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');


var paths = {
  SRC: glob.sync('./src/js/**/*.js'),
};
var mainSrcFile = glob.sync('./src/js/app.js');
var specFiles = glob.sync('./specs/js/**/*.js')
                //.concat(glob.sync('./spec/javascripts/*.js'))
                //.concat(glob.sync('./spec/javascripts/components/**/*.js'))
                //.concat(glob.sync('./spec/javascripts/lib/**/*.js'))
                //.concat(glob.sync('./spec/javascripts/helpers/**/*.js'))
                //.concat(glob.sync('./spec/javascripts/stores/**/*.js'))
                //.concat(glob.sync('./spec/javascripts/models/**/*.js'))
                //.concat(glob.sync('./spec/javascripts/handlers/**/*.js'));


var b = browserify(_.extend(browserifyInc.args, {entries: mainSrcFile, debug: true})).transform(babelify);
browserifyInc(b, {cacheFile: './tmp/browserify-cache.json'});

var specB = browserify(_.extend(browserifyInc.args, {entries: specFiles, debug: true})).transform(babelify);
browserifyInc(specB, {cacheFile: './tmp/browserify-cache-specs.json'});

//var jqueryFiles = ['./node_modules/jquery/dist/jquery.min.js', './node_modules/jquery/dist/jquery.min.map'];
//var bootstrapJsFiles = ['./node_modules/bootstrap/dist/js/bootstrap.min.js'];
//var typeaheadFiles = ['./node_modules/typeahead.js/dist/typeahead.jquery.min.js'];
//var jqueryTextCompleteFiles = ['./node_modules/jquery-textcomplete/dist/jquery.textcomplete.min.js', './node_modules/jquery-textcomplete/dist/jquery.textcomplete.min.map'];
var underscoreFiles = ['./node_modules/underscore/underscore-min.js', './node_modules/underscore/underscore-min.map'];

function buildJs() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('error', function () { this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts/'));
}

function buildSpecs() {
  return specB.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('error', function () { this.emit('end'); })
    .pipe(source('specs.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/javascripts/'));
}

gulp.task('underscore', function() {
  return gulp.src(underscoreFiles)
    .pipe(gulp.dest('./public/javascripts'));
});

//gulp.task('watch', ['watch:non-js', 'webpack-dev-server']);
gulp.task('watch', ['webpack-dev-server']);

//gulp.task('watch:js', function() {
//  gulp.watch
//  //gulp.watch(jqueryFiles, ['jquery']);
//  //gulp.watch(bootstrapJsFiles, ['bootstrap']);
//  //gulp.watch(typeaheadFiles, ['typeahead']);
//  gulp.watch(underscoreFiles, ['underscore']);
//  //gulp.watch(jqueryTextCompleteFiles, ['jquerytextcomplete']);
//});

gulp.task('build', ['buildJs', 'underscore']);

gulp.task('buildJs', buildJs);

gulp.task('watchBuildJs', function() {
  b.on('log', gutil.log);
  gulp.watch(paths.SRC, ['buildJs']);
});

gulp.task('buildSpecs', buildSpecs);

gulp.task('watchSpecs', function() {
  specB.on('log', gutil.log);
  gulp.watch(specFiles.concat(paths.SRC), ['buildSpecs']);
});

// Runs the webpack dev server. It builds bundle.js with webpack and serves it
// from the dev server, which will serve it out of memory instead of writing it
// to the filesystem in the dev environment.
gulp.task('webpack-dev-server', function() {
  return new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(8080, 'localhost', function (err, result) {
    if (err) {
      gutil.log(err);
    }
    gutil.log('Listening at localhost:8080');
  });
});

gulp.task('clean', function() {
  return gulp.src([
    './tmp/browserify-cache.json',
    './tmp/browserify-cache-specs.json',
    './public/javascripts/bundle.js',
    './public/javascripts/bundle.js.map'
    ]).pipe(removeFiles());
});

////////////////////////////////
// run specs in console continuously
////////////////////////////////
function buildSpecsAndRun() {
  var startTime = new Date();
  console.log("buildSpecsAndRun");
  // #hackalert
  // Aborting process.exit because gulp-jasmine-browser kills watcher:
  // @see https://github.com/jasmine/gulp-jasmine-browser/blob/49bb8f2d08ae437cbd81b0b1ac695a881d998eea/src/lib/drivers/phantomjs.js#L14
  var oldExit = process.exit;
  process.exit = function(code) {
    var elapsed = (new Date()) - startTime;
    elapsed = (elapsed / 1000).toString() + "s";
    console.log("process.exit: ABORTED by buildSpecsAndRun");
    console.log("buildSpecsAndRun time:", elapsed);
  };
  buildSpecs().pipe(jasmineBrowser.specRunner({console: true}))
  .pipe(jasmineBrowser.headless())
  .pipe(process.stdout);
}

gulp.task('buildSpecsAndRun', buildSpecsAndRun);

gulp.task('watchSpecsAndRun', function() {
  specB.on('log', gutil.log);
  gulp.watch(specFiles.concat(paths.SRC), ['buildSpecsAndRun']);
});

gulp.task('specs', ['buildSpecs', 'watchSpecsAndRun'], function() {
  gulp.watch('public/javascripts/specs.js');
});


////////////////////////////////
// run specs in console and exit
////////////////////////////////
gulp.task('jasmine-phantom', ['buildSpecs'], function() {
  return gulp.src(['public/javascripts/specs.js'])
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless());
});

////////////////////////////////
// build specs continuously, run jasmine in chrome browser
////////////////////////////////
gulp.task('jasmine', ['buildSpecs', 'watchSpecs'], function() {
  var compiledSpecFiles = ['public/javascripts/specs.js', 'public/javascripts/specs.js.map'];
  return gulp.src(compiledSpecFiles)
    .pipe(watch(compiledSpecFiles))
    .pipe(jasmineBrowser.specRunner({}))
    .pipe(jasmineBrowser.server({port: 8888}));
});
