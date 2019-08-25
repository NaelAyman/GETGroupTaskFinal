var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    livereload = require('gulp-livereload'),
    wait = require('gulp-wait'),
    sourcemaps = require('gulp-sourcemaps'),
    image = require('gulp-image'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber');

var htmlPath = 'stage/html/*.pug',
    cssPathes = [
      'stage/css/libs/bootstrap.min.css',
      'stage/css/libs/font-awesome-5all.css',
      'stage/css/libs/font-awesome.min.css',
      'stage/css/libs/owl.carousel.css',
      'stage/css/libs/animate.css',
      'stage/css/**/*.scss',
      'stage/css/**/*.css'
    ],
    jsPath = 'stage/js/*.js';

// Html Task
gulp.task('html', function() {

  return gulp.src(htmlPath)                       // [1] Get The Source
            .pipe(pug({ pretty: true }))          // [2] Compile Pug To Html
            .pipe(gulp.dest('dist'))              // [3] Copy File To Dist Folder
            .pipe(livereload())                   // [4] Reload The Page

});

// Css Task
gulp.task('css', function() {

  // to make order my files when compile
  return gulp.src(cssPathes)
          .pipe(wait(500))
          .pipe(plumber())
          .pipe(sourcemaps.init())
          .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
          .pipe(autoprefixer('last 5 version'))
          .pipe(concat('master.min.css'))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('dist/css'))
          .pipe(livereload())

});

// Js Task

gulp.task('js', function() {

  return gulp.src(jsPath)
            .pipe(sourcemaps.init())
            .pipe(concat('scripts.js'))
            .pipe(minify())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'))
            .pipe(livereload())

});

// Images Task

gulp.task('images', function() {
    
  return gulp.src('stage/img/*.*')
            .pipe(image())
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img'))
            .pipe(livereload());

});

// Watch Task

gulp.task('watch', function() {

  require('./server.js');
  livereload.listen();
  gulp.watch('stage/html/**/*.pug' , ['html']);
  gulp.watch(cssPathes , ['css']);
  gulp.watch(jsPath , ['js']);
  gulp.watch('stage/img/*.*' , ['images']);

});

// Default Task

gulp.task('default', ['watch']);