
var gulp = require('gulp');


var sourceFiles = [];
gulp.task('copy-assets', function () {
    return gulp.src('./src/**/**.json' )
        .pipe(gulp.dest('./build/'));
});
