const {src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cache = require('gulp-cache');



function css( done ){
    src('src/scss/**/*.scss')
    .pipe( plumber())
    .pipe( sass())
    .pipe( dest('build/css'))
    done();
}

function javascript( done ){
    src('src/js/**/.js')
    .pipe( dest('build/js'))
    done();
}

function dev( done ){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.dev = parallel(css, javascript, dev);