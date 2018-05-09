
var gulp = require('gulp');
var gulp = require("gulp-help")(require("gulp")),
    ts = require("gulp-typescript"),
    nodemon = require("gulp-nodemon");


    
/***********************************************************************************
 * copy jsons from src to build
 ***********************************************************************************/
gulp.task('copy-assets', function () {
    return gulp.src('./src/**/**.json')
        .pipe(gulp.dest('./build/'));
});

/***********************************************************************************
 * Build es5 javascript files from typescript sources
 ***********************************************************************************/
gulp.task("compile", function () {
    var project = ts.createProject({
        "module": "commonjs",
        "target": "es6",
        "sourceMap": true,
        "strictNullChecks": true,
        "pretty": true,
        "lib": ["es2017"],
        "allowJs": true,
        "removeComments": false,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "preserveConstEnums": true,
        "suppressImplicitAnyIndexErrors": true,
    });
    return gulp.src("./src/**/*.ts")
        .pipe(project())
        .pipe(gulp.dest("./build/"))
});

/***********************************************************************************
 * Call "build" task and start nodemon with watch (autorestart on changes found)
 ***********************************************************************************/
gulp.task("serve", ["compile", "copy-assets"], function () {
    var stream = nodemon({
        script: "build/index.js",
        watch: ["src"],
        ext: "ts",
        tasks: ["compile", "copy-assets"],
    });
    return stream;
});
