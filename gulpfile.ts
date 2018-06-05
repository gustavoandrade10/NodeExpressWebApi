import { Gulpclass, Task, SequenceTask } from "gulpclass";
import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as  nodemon from "gulp-nodemon";
import * as  open from 'gulp-open';
import { SwaggerGenerator } from './swaggerGenerator';


@Gulpclass()
export class Gulpfile {

    private tsProjectBuild;
    private swagger =  new SwaggerGenerator();
    constructor() {
        this.tsProjectBuild = ts.createProject("tsconfig.json");
    }

    @Task('serve', ["build"])
    serve() {
        let started = false;

        return nodemon({
            script: "build/index.js",
            watch: ["src"],
            ext: "ts",
            tasks: ['build']
        }).on('start', () => {
            if (!started) {
                gulp.start('browser');
                started = true;
            }
        })
    }

    @Task('compile')
    compile() {
        return gulp.src("./src/**/*.ts")
            .pipe(this.tsProjectBuild())
            .pipe(gulp.dest("./build/"))
    }

    @Task('copy-source-files') 
    copySourceFiles(cb: Function) {
         this.swagger.generate((success) => {
            gulp.src('./src/**/**.json')
                .pipe(gulp.dest('./build/'));
                cb();
        });     
    }

    @Task('browser')
    openBrowser() {
        var options = {
            uri: 'http://localhost:3000',
            app: 'chrome'
        };
        gulp.src(__filename)
            .pipe(open(options));
    }
    
    @SequenceTask() 
    build() {
        return ["compile", "copy-source-files"];
    }

    @Task()
    default() {
        return ["serve"];
    }

}