const gulp = require("gulp-help")(require("gulp"));
const ts = require("gulp-typescript");
const nodemon = require("gulp-nodemon");
const open = require('gulp-open');
const swaggerGenerator = require('./swaggerGenerator');
const tsProject = ts.createProject("tsconfig.json");


/***********************************************************************************
 * Generates the documentation for app using swagger, and copy json files to build
 ***********************************************************************************/
gulp.task('handle-jsons', function () {

    swaggerGenerator.generate((success) => {
        gulp.src('./src/**/**.json')
            .pipe(gulp.dest('./build/'));
    });      
});

/***********************************************************************************
 * Build es6 javascript files from typescript sources
 ***********************************************************************************/
gulp.task("compile", function () {
    return gulp.src("./src/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("./build/"))
});

/***********************************************************************************
 * Call "serve" task and start nodemon with watch (autorestart on changes)
 ***********************************************************************************/
gulp.task("serve", ["compile", "handle-jsons"], function () {
    let started = false;

    return nodemon({
        script: "build/index.js",
        watch: ["src"],
        ext: "ts",
        tasks: ["compile", "handle-jsons"]
    }).on('start', () => {
        if (!started) {
            gulp.start('browser');
            started = true;
        }
    })
});


/***********************************************************************************
 * Open browser
 ***********************************************************************************/
gulp.task('browser', function () {
    var options = {
        uri: 'http://localhost:3000',
        app: 'chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));
});