const { src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// imagenes
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const cache = require("gulp-cache");

function css(done) {
    src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
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

function versionAvif(done) {
    const opciones = {
    quality: 50,
};

    src("src/img/**/*.{png,jpg}")
    .pipe(plumber())
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
    done();
}

exports.css = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, css ,javascript, dev);
