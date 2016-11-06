
var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass'),
    //karma = require('gulp-karma'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate'),
    concatCss = require('gulp-concat-css');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// cleans the build output
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('clean', function () {
    return del(['dist']);
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// runs bower to install frontend dependencies
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});


//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('build-template-cache', ['clean'], function() {
    
    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");
    
    return gulp.src("app/templates/*.html")
        .pipe(ngHtml2Js({
            moduleName: "todoPartials",
            prefix: "/templates/"
        }))
        .pipe(concat("templateCache.js"))
        .pipe(gulp.dest("./dist/js"));
});




gulp.task('build-css', ['clean'], function() {
    return gulp.src("app/styles/**/*.css")
        
        .pipe(concatCss("styles/bundle.css"))
        
        .pipe(gulp.dest('./dist'));
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// runs jshint
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('jshint', function() {
    gulp.src('/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});



//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('build-js', ['clean'], function() {
    
    var b = browserify({
        entries: './app/app.js',
        debug: false,
        paths: ['./app/controllers'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
//
// full build (except sprites), applies cache busting to the main page css and js bundles
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('build', [ 'clean', 'bower','build-template-cache','build-css', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*////
// watches file system and triggers a build when a modification is detected
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./app/**/*.html', './styles/*.*css', './app/**/*.js'], ['build']);
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*////
// launches a web server that serves files in the current directory
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//

gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            port:4000,
            open: "http://localhost:4000/dist/"
        }));
});

//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*////
// launch a build upon modification and publish it to a running server
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
gulp.task('dev', ['watch', 'webserver']);


//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*////
// installs and builds everything, including sprites
//
//*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*//
gulp.task('default', ['build']);