const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

// Funcion que compila SASS

function css() {
    return src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'expanded' // para minificar es "compressed"
        }))
        .pipe(dest('./build/css'))
}

function watchArchivos() {
    watch('src/scss/**/*.scss', css); // ** = Todas las carpetas / * = Todos los archivos
}

exports.css = css;
exports.watchArchivos = watchArchivos;