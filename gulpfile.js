const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");

function styles() {
  return src(["src/css/normalize.css", "src/scss/style.scss"])
    .pipe(scss({ outputStyle: "expanded" })) //nested, expanded, compact, compressed
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        browserlist: ["cover 99.5%"],
        grid: true,
      })
    )
    .pipe(dest("src/css/"))
    .pipe(browserSync.stream());
}

function scripts() {
  return (
    src(["src/js/main.js"])
      .pipe(concat("main.min.js"))
      // .pipe(uglify())
      .pipe(dest("src/js/"))
      .pipe(browserSync.stream())
  );
}

function images() {
  return src("src/img/*.jpg")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/img/"));
}

function copyHtml() {
  return src("src/*.html").pipe(dest("dist")).pipe(browserSync.stream());
}

function watching() {
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/**/*.js", "!src/js/main.min.js"], scripts);
  watch("src/*.html", copyHtml);
  watch("src/img/*.jpg", images);
}

function bsync() {
  browserSync.init({
    server: "src",
  });
}

function build() {
  return src(
    [
      "src/*.html",
      "src/js/main.min.js",
      "src/fonts/**/*",
      "src/css/style.min.css",
      "src/img/**/*.svg",
    ],
    {
      base: "src", // specified common root to keep proper directory paths
    }
  ).pipe(dest("dist"));
}

function clean() {
  return del("dist");
}

exports.styles = styles;
exports.concat = concat;
exports.watch = watching;
exports.bsync = bsync;
exports.scripts = scripts;
exports.images = images;
exports.build = series(clean, styles, images, scripts, build);
exports.default = parallel(styles, bsync, scripts, watching);
