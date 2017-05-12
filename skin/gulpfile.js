// Requires
const gulp = require('gulp');
const babel = require('gulp-babel');

// Include plugins
// css
const less = require('gulp-less');
const nano = require('gulp-cssnano');
const uncss = require('gulp-uncss');
const autoprefixer = require('gulp-autoprefixer');

// const critical = require('critical').stream;
const plumber = require('gulp-plumber');
// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// html
const twig = require('gulp-twig');
const data = require('gulp-data');
const path = require('path');
// img
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
// all
const gulpsync = require('gulp-sync')(gulp);
const rename = require('gulp-rename');
const taskListing = require('gulp-task-listing');
const browserSync = require('browser-sync');
// email
const inlineCss = require('gulp-inline-css');



 
// Add a task to render the output 
gulp.task('help', taskListing);

// Paths
var src = './src';
var dist = './dist';

// CSS
gulp.task('css', function () {
  return gulp.src(src + '/less/style.less')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(less())
    // .pipe(uncss({
    //   html: [dist + '/*.html'],
    //   timeout: 1000,
    //   ignore: [
    //     /show-menu/,
    //     /open/,
    //     /slick/,
    //     /active/,
    //     /next/,
    //     /prev/,
    //     /no-/,
    //     /ink/,
    //     /animate/,
    //     /affix/,
    //     /kr-/,
    //     /wf-/,
    //     /jqvmap-/
    // ]
    // }))
    // .pipe(plumber.stop())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest( dist + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('minify', function () {
  return gulp.src(`${dist}/css/style.css`)
    .pipe(nano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${dist}/css`));
});



// TWIG
gulp.task('twig', function () {
    'use strict';
    return gulp.src(src + '/views/*.twig')
        .pipe(data(function(file) {
            return require( src + '/data/' + path.basename(file.path).replace('.html.twig', '.json'));
        }))
        .pipe(twig({
            errorLogToConsole: true
        }))
        .pipe(rename(function(opt) {
            opt.basename = opt.basename.replace('.html', '');
            return opt;
        }))
        .pipe(gulp.dest(dist));
});


// Tâche "critical" = critical inline CSS
// gulp.task('critical', gulpsync.sync(['html', 'css', 'minify']), function(cb) {
//   return  gulp.src(dist + '/*.html')
//     .pipe(critical({
//       base: dist,
//       dest: dist + '/css/critical.min.css',
//       // dest: dist + '/index-critical.html',
//       inline: false,
//       minify: true,
//       extract: true,
//       css: [ dist + '/css/style.min.css' ],
//       ignore: ['@font-face',/url\(/],        //
//       dimensions: [{
//         height: 480,
//         width: 320
//       }, {
//         height: 1440,
//         width: 2560
//       }]
//     }))
//     .pipe(gulp.dest(dist));

//   // critical.generate({
//   //     inline: true,
//   //     base: 'dist/',
//   //     src: 'index.html',
//   //     dest: 'dist/index-critical.html',
//   //     minify: true,
//   //     width: 320,
//   //     height: 480
//   // });
// });



// Tâche "libjs" = uglify + concat
gulp.task('libjs', function () {
 return gulp.src([
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/js/collapse.js',
    './bower_components/bootstrap/js/dropdown.js',
    './bower_components/bootstrap/js/transition.js',
    './bower_components/bootstrap/js/tooltip.js',
    './bower_components/bootstrap/js/affix.js',
    './bower_components/bootstrap/js/modal.js',
    './bower_components/intl-tel-input/build/js/intlTelInput.min.js'
  ])
   .pipe(uglify())
   .pipe(concat('lib.min.js'))
   .pipe(gulp.dest(dist + '/js'));
});


gulp.task('js', function () {
 return gulp.src([
      src + '/js/*.js',
      src + '/js/module/*.js'
    ])
    .pipe(babel({
      presets: ['es2015']
    })) 
    // .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(browserSync.stream());
});


// Tâche "jsAtIt", copy JS files from src to dist
gulp.task('jsAsIt', function () {
    return gulp.src([
        './bower_components/intl-tel-input/build/js/utils.js'
    ])
    .pipe(gulp.dest(dist + '/js'));
});

gulp.task('loadcss', function () {
  return gulp.src([
      src + '/js/unused/loadcss.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest(`${dist}/js/unused`))
    .pipe(rename({
      suffix: '.min'
    }))
});

// gulp.task('admincss', function () {
//     return gulp.src(src + '/less/admin.less')
//         .pipe(plumber())
//         .pipe(less())
//         .pipe(concat('admin.min.css'))
//         .pipe(gulp.dest(dist + '/css'));
// });

// gulp.task('adminjs', function () {
//     return gulp.src([
//         './bower_components/bootstrap-fileinput/js/fileinput.js',
//         '../htdocs/vendor/emc/fileinput-bundle/EMC/FileinputBundle/Resources/public/js/emc.fileinput.js'
//     ])
//     .pipe(uglify())
//     .pipe(concat('admin.min.js'))
//     .pipe(gulp.dest(dist + '/js'));
// });

// Tâche "img" = Images optimisées
gulp.task('img', function () {
  return gulp.src(src + '/images/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(`${dist}/images`));
});

gulp.task('uploads', function () {
  return gulp.src(src + '/uploads/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest(`${dist}/uploads`));
});


// ADMIN
gulp.task('admincss', function () {
  return gulp.src([
      src + '/admin/less/admin.less',
      src + '/admin/less/admin2.css',
    ])
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(less())
    .pipe(plumber.stop())
    .pipe(nano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest( dist + '/css'))
    .pipe(browserSync.stream());
});

gulp.task('adminjs', function () {
 return gulp.src([
      src + '/js/admin/*.js',
      './bower_components/bootstrap-fileinput/js/fileinput.js',
      '../htdocs/vendor/emc/fileinput-bundle/EMC/FileinputBundle/Resources/public/js/emc.fileinput.js'
    ])
    .pipe(uglify())
    .pipe(concat('admin.min.js'))
    .pipe(gulp.dest(`${dist}/js`))
    .pipe(browserSync.stream());
});

// EMAIL
gulp.task('emailcss', function () {
  return gulp.src(src + '/email/less/styles.less')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(less())
    .pipe(plumber.stop())
    .pipe(rename({
      basename: "email",
    }))
    .pipe(gulp.dest( src + '/email/css'))
    .pipe(browserSync.stream());
});

gulp.task('email', function() {
    return gulp.src(src + '/email/views/*.twig')
        .pipe(data(function(file) {
            return require( src + '/email/data/' + path.basename(file.path).replace('.html.twig', '.json'));
        }))
        .pipe(twig({
            errorLogToConsole: true
        }))
        .pipe(rename(function(opt) {
            opt.basename = opt.basename.replace('.html', '');
            return opt;
        }))
        .pipe(inlineCss({
          applyStyleTags : true,
          preserveMediaQueries : true
        }))
        .pipe(gulp.dest(dist + '/email'));
});



gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: dist
        }
    });
});

// Tâche "dist" = toutes les tâches ensemble
gulp.task('dist', gulpsync.sync(['twig', 'css', 'minify', 'libjs', 'js', 'jsAsIt', 'img', 'uploads', 'admincss', 'adminjs']));

gulp.task('watch', function () {
  browserSync.init({
      server: {
        baseDir: dist
      }
  });
  gulp.watch([src + '/less/*.less', src + '/less/**/*.less'], ['css']);
  gulp.watch([src + '/email/less/*.less'], [gulpsync.sync(['emailcss', 'email']), browserSync.reload]);
  gulp.watch([src + '/email/views/*.twig'], ['email', browserSync.reload]);
  gulp.watch(src + '/admin/less/*.less', ['admincss']);
  gulp.watch([src + '/js/*.js', src + '/js/module/*.js'], ['js', browserSync.reload]);
  gulp.watch([src + '/views/*.twig', src + '/views/**/*.twig'], ['twig', browserSync.reload]);
});

// Default task
gulp.task('admin', ['adminjs', 'admincss']);
gulp.task('compile', ['dist']);
gulp.task('default', ['dist']);
