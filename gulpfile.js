/*jshint esversion: 6 */
const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('app/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:libs', ['clean'], function () {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/es6-shim/es6-shim.js',
      'node_modules/angular2/bundles/http.dev.js'
    ])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy:assets', ['clean'], function () {
  return gulp
    .src('app/**/*.html')
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:css', ['clean'], function () {
  return gulp.src('app/styles/*.css')
    .pipe(gulp.dest('dist/app/styles'));
});

gulp.task('build', ['compile', 'copy:libs', 'copy:assets', 'copy:css']);
gulp.task('default', ['build']);