'use strict';

const { src, dest, watch, series, parallel } = require('gulp');

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const del = require('del');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const gulpwebp = require('gulp-webp');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const browsersync = require('browser-sync').create();

// gulp clean
function clean () {
  return del('build');
}

// gulp copy
function copy () {
  return src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**/*',
    'source/js/main.min.js',
    'source/vendor/**/*',
    'source/css/main.min.css',
    'source/*.html'
  ], {
    base: 'source'
  })
    .pipe(dest('build/'));
}

// gulp css
function css () {
  return src('source/sass/main.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest('source/css'))
    .pipe(csso({
      restructure: false
    }))
    .pipe(rename('main.min.css'))
    .pipe(dest('source/css'))
    .pipe(browsersync.stream());
}

// gulp js
function js () {
  return src([
    'source/js/all/hamburger.js',
    'source/js/all/modal.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest('source/js'));
}

// gulp jswatch
function jswatch (done) {
  browsersync.reload();
  done();
}

// gulp images
function images () {
  return src('source/img/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]))
    .pipe(dest('source/img'));
}

// gulp webp
// Webp (options) https://github.com/imagemin/imagemin-webp#imageminwebpoptions
// Crop - Object { x: number, y: number, width: number,
// height: number }
// Resize the image. Happens after crop - Object { width: number, height:
// number }
function webp () {
  return src('source/img/*.{jpg,png}')
    .pipe(gulpwebp({ quality: 90 }))
    .pipe(dest('source/img/webp'));
}

// gulp svg
function svg () {
  return src('source/img/svg/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeTitle: true
      }, {
        removeDesc: true
      }, {
        removeViewBox: false
      }, {
        removeDimensions: true
      }, {
        sortAttrs: true
      }, {
        cleanupNumericValues: {
          floatPrecision: 0,
          leadingZero: true,
          defaultPx: true,
          convertToPx: true
        }
      }],
      js2svg: {
        pretty: true
      }
    }))
    .pipe(dest('source/img/svg'));
}

// gulp svgsprite
function svgsprite () {
  return src('source/img/svg/icon-*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(dest('source/img/svg'));
}

// gulp server
function server () {
  browsersync.init({
    server: 'source',
    cors: true
  });

  watch(['source/sass/*.scss', 'source/sass/blocks/*.scss'], css);
  watch('source/*.html').on('change', browsersync.reload);
  watch('source/js/all/**/*.js', series(js, jswatch));
}

// ---------------------------------------------------------------------

// exported tasks
exports.clean = clean;
exports.copy = copy;
exports.css = css;
exports.js = js;
exports.jswatch = jswatch;
exports.images = images;
exports.webp = webp;
exports.svg = svg;
exports.svgsprite = svgsprite;
exports.server = server;

exports.start = series(css, js, server);
exports.build = series(parallel(css, js), clean, copy);
