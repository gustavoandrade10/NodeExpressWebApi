
var gulp = require('gulp');

gulp.task('copy-assets', function () {
    return gulp.src('./src/**/**.json' )
        .pipe(gulp.dest('./build/'));
});
