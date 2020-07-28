let gulp = require('gulp'), // Сам gulp
  bs = require('browser-sync'),
  sass = require('gulp-sass'), // Компиляция стилей
  minifyJs = require('gulp-terser'), // Минификация js
  autoPrefixer = require('gulp-autoprefixer'), // Вендорные префиксы
  rename = require('gulp-rename'), //Rename
  delFiles = require('del'), // Delete files
  cssMinify = require('gulp-csso'), // Minify css
  babel = require('gulp-babel'),
  image = require('gulp-image')


//sass
gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssMinify())
    .pipe(gulp.dest('dist/css'))
});

// Очистка перед сборкой
gulp.task('clean', () => {
  return delFiles('dist');
});

gulp.task('imagemin', () => {
  return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.jpeg', 'src/**/*.svg'])
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('dist'));
});

// Компиляция es6+ в es5 и минификация
gulp.task('js:babel', () => {
  return gulp.src(
    [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/js/**/*.js']
  )
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(minifyJs())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('server', () => {
  return bs({
    server: {
      baseDir: 'dist'
    },
    browser: 'Chrome'
  })
});

gulp.task('copy:html', () => {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:fonts', () => {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:js', () => {
  return gulp.src('src/vendor/js/*.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy:icons', () => {
  return gulp.src('src/icons/*.*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:css', () => {
  return gulp.src('src/vendor/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', () => {
  return gulp.watch('src/sass/**/*.sass', gulp.series('sass', (done) => {
    bs.reload();
    done()
  }))
});
gulp.task('js:watch', () => {
  return gulp.watch('src/js/**/*.js', gulp.series('js:babel', (done) => {
    bs.reload();
    done()
  }))
});
gulp.task('html:watch', () => {
  return gulp.watch('src/*.html', gulp.series('copy:html', (done) => {
    bs.reload();
    done()
  }))
});


// Задача по умолчанию, которая вызывается в терминале командой gulp
// Содержит все задачи в определенной последовательности
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('sass', 'js:babel', 'imagemin', 'copy:html', 'copy:js', 'copy:css', 'copy:fonts', 'copy:icons'),
  gulp.parallel('server', 'sass:watch', 'js:watch', 'html:watch')
));



















