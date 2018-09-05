'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserify = require('browserify');
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task("ts", function () {
  return browserify({
    entries: ['./src/ts/index.ts'],
    debug: true
  }).plugin(tsify)
    .transform('babelify', {
        presets: ['env'],
        extensions: ['.ts']
    })
    .bundle()
    .on('error', err => console.log(`browserify ${err}`))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))//uglify
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js/'));
});
 // =================================
 // ======= start html config========
 // =================================

gulp.task('html', () => {
	return gulp.src('./src/pug/*.pug')
	.pipe(plugins.pug({pretty:true}))
	.on('error', (err) => {
		console.log(`pug err ${err}`)
	})
	.pipe(gulp.dest('./public/'));
});
 // =================================
 // ======= end html config========
 // =================================

// =================================
// ======= start css config========
// =================================

gulp.task('css', () => {
  return gulp.src('./src/sass/*.s?ss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .on('error', plugins.sass.logError)
    .pipe(plugins.postcss([ autoprefixer({browsers: 'last 2 versions'}) ]))
    .pipe(plugins.sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css/'));
});

// =================================
// ======= end css config========
// =================================

// =================================
// ===== start watch config ========
// =================================

gulp.task('watch', () => {
  gulp.watch('./src/sass/**/*.s?ss', ['css']);
  gulp.watch('./src/pug/**/*.pug', ['html']);
  gulp.watch('./src/ts/**/*.ts', ['ts']);
});

// =================================
// ===== end watch config ========
// =================================

// =================================
// ======= default config run ========
// =================================
gulp.task('default',['html', 'css', 'ts','watch'])