const { parallel, src, dest, watch } = require( 'gulp' );

// CSS
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imágenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Funcion que compila SASS
function css(done) {
    src( 'src/scss/**/*.scss' ) // Identificar el .scss a compilar
      .pipe( sourcemaps.init() )
      .pipe( plumber() )
      .pipe( sass( {
          outputStyle: 'expanded' // para minificar es "compressed"
      } ) ) // Compilarlo
      .pipe( postcss( [autoprefixer(), cssnano()] ) )
      .pipe( sourcemaps.write('.') )
      .pipe( dest( './build/css' ) ) // Almacenar en el disco duro

    done();
}

function imagenes( done ) {

    const options = {
        optimizationLevel: 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(options) ) )
        .pipe( dest('build/img') )

    done();
}

function versionWebp( done ) {

    const options = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( webp( options ) )
        .pipe( dest( 'build/img' ) )

    done();
}

function versionAvif( done ) {

    const options = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}')
        .pipe( avif( options ) )
        .pipe( dest( 'build/img' ) )

    done();
}

function javascript( done ) {
  src( 'src/js/**/*.js' )
    .pipe( dest('build/js') );

    done();
}

function dev(done) {
    watch( 'src/scss/**/*.scss', css ); // ** = Todas las carpetas / * = Todos los archivos
    watch( 'src/js/**/*.js', javascript ); // ** = Todas las carpetas / * = Todos los archivos
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.javascript = javascript;
exports.versionAvif = versionAvif;
exports.dev = dev;
exports.imagenes = imagenes;
exports.watch = parallel( imagenes, versionWebp, versionAvif, dev );