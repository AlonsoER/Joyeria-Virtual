const { src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const concat = require('gulp-concat');

// imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cache = require("gulp-cache");

function css(done) {
    src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));
    done();
}

function javascript(done) {
    src("src/js/**/*.js").pipe(dest("build/js"));
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}

function imagenes(done) {
    const opciones = {
    optimozationLevel: 3,
};

    src("src/img/**/*.{png,jpg}")
    .pipe(plumber())
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
    done();
}

function versionWebp(done) {
    const opciones = {
    quality: 50,
};

    src("src/img/**/*.{png,jpg}")
    .pipe(plumber())
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, css ,javascript, dev);
