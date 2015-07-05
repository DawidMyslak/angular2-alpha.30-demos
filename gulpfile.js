'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var tsc = require('gulp-typescript');
var Builder = require('systemjs-builder');
var del = require('del');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var open = require('open');

var PORT = 9000;

var PATHS = {
  src: {
    ts: 'src/**/*.ts',
    html: 'src/**/*.html',
    css: 'src/**/*.css'
  },
  dest: {
    all: 'dist',
    lib: 'dist/lib',
    angular2: 'dist/lib/angular2.js',
    router: 'dist/lib/router.js'
  },
  lib: [
    './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
    './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
    './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
    './node_modules/reflect-metadata/Reflect.js',
    './node_modules/reflect-metadata/Reflect.js.map',
    './node_modules/systemjs/dist/system.src.js',
    './node_modules/angular2/node_modules/zone.js/dist/zone.js'
  ]
};

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

var angular2Builder = new Builder({
  paths: {
    'angular2/*': 'node_modules/angular2/es6/dev/*.js',
    rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
  },
  meta: {
    rx: {
      format: 'cjs'
    }
  }
});

gulp.task('clean', function (done) {
  del([PATHS.dest.all], done);
});

gulp.task('ts', function () {
  var result = gulp.src(PATHS.src.ts)
    .pipe(plumber())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(gulp.dest(PATHS.dest.all));
});

gulp.task('html', function () {
  return gulp.src(PATHS.src.html)
    .pipe(gulp.dest(PATHS.dest.all));
});

gulp.task('css', function () {
  return gulp.src(PATHS.src.css)
    .pipe(gulp.dest(PATHS.dest.all));
});

gulp.task('angular2', function () {
  angular2Builder.build('angular2/router', PATHS.dest.router, {});
  return angular2Builder.build('angular2/angular2', PATHS.dest.angular2, {});
});

gulp.task('libs', ['angular2'], function () {
  return gulp.src(PATHS.lib)
    .pipe(gulp.dest(PATHS.dest.lib));
});

gulp.task('play', ['default'], function () {
  gulp.watch(PATHS.src.ts, ['ts']);
  gulp.watch(PATHS.src.html, ['html']);
  gulp.watch(PATHS.src.css, ['css']);

  var app = connect().use(serveStatic(__dirname + '/dist'));
  http.createServer(app).listen(PORT, function () {
    open('http://localhost:' + PORT);
  });
});

gulp.task('default', ['ts', 'html', 'css', 'libs']);