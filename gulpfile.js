var gulp = require("gulp");

var sass = require("gulp-sass"), // переводит SASS в CSS
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображение
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"); // Переименование файлов




gulp.task("html", function() {
    return gulp.src("src/*.html")
    .pipe(gulp.dest("build"));
});


gulp.task("sass", function() {
    return gulp.src(['src/sass/styles.scss', 'src/sass/media.scss'])
        .pipe(concat('styles.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("build/css"));
});

gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один 
        .pipe(uglify()) // вызов плагина uglify - сжатие кода
        .pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest("build/js")); // директория продакшена, т.е. куда сложить готовый файл
});

gulp.task('imgs', function() {
    return gulp.src("src/images/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("build/images"))
});

gulp.task('watch', function() {
    gulp.watch('src/*.html', gulp.parallel('html'));
    gulp.watch('src/js/*.js', gulp.parallel('scripts'));
    gulp.watch('src/sass/*.scss', gulp.parallel('sass'));
    gulp.watch('src/images/*.+(jpg|jpeg|png|gif)', gulp.parallel('imgs'));
});



gulp.task('default', gulp.parallel('html', 'sass', 'scripts', 'imgs', 'watch'));
