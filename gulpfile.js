var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('webpack');
var webpackServerConfig = require('./server/webpack.config.js');
var webpackClientConfig = require('./client/webpack.config.js');

var reload = browserSync.reload;

var webpackFormat = {
    assets: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    timings: false,
    version: false
};

gulp.task('default', ["run"]);
gulp.task('watch', ["watch:client", "watch:server"]);
gulp.task('build', ["build:client", "build:server"]);

gulp.watch('dist/app/*', function () {
  console.log('Files changed. Reloading browser...');
  reload();
});

function build(config, callback) {
    if (!callback) config.watch = true;
    webpack(config, function (err, stats) {
        if (err)
            throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build] Completed\n' + stats.toString(webpackFormat));
        if (callback) callback();
    });
}

gulp.task("watch:server", function () {
    build(webpackServerConfig);
});

gulp.task("build:server", function (callback) {
    build(webpackServerConfig, callback);
});

gulp.task("watch:client", function () {
    build(webpackClientConfig);
});

gulp.task("build:client", function (callback) {
    build(webpackClientConfig, callback);
});

gulp.task('run', ["watch"], function () {
    let stream = nodemon({
	script: 'dist/server.js',
	watch: 'dist/server.js'
    });
    
    browserSync.init({
	proxy: "localhost:8080"
    });
    
    stream.on('restart', function () {
	console.log('restarted!');
    }).on('crash', function() {
	console.error('Application has crashed!\n');
        stream.emit('restart', 10);  // restart the server in 10 seconds
    });
});
