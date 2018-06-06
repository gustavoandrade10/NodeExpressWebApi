import { Gulpclass, Task, SequenceTask } from "gulpclass";
import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as nodemon from "gulp-nodemon";
import * as open from 'gulp-open';
import * as path from 'path';
import * as sourcemaps from 'gulp-sourcemaps';
import { SwaggerGenerator } from './swaggerGenerator';


@Gulpclass()
export class Gulpfile {

    private tsProjectDev;
    private tsProjectProd;
    private swagger = new SwaggerGenerator();
    private paths = {
        src: {
            foldername: 'src',
            files: './src/**/*.ts',
            assets: './src/**/**.json'
        },
        dev: {
            foldername: '.temp',
            folderpath: './.temp/',
            entryFile: '.temp/index.js'
        },
        prod: {
            foldername: 'dist',
            folderpath: './dist/'
        }
    };

    constructor() {
        this.tsProjectDev = ts.createProject("tsconfig.json");
        this.tsProjectProd = ts.createProject({
            outDir: this.paths.prod.folderpath,
            module: "commonjs",
            target: "es6",
            sourceMap: false,
            strictNullChecks: true,
            lib: ["ES2017", "ES2015"],
            removeComments: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true
        })
    }

    @Task('serve', ['development-compile'])
    serve() {
        let started = false;

        return nodemon({
            script: this.paths.dev.entryFile,
            watch: [this.paths.src.foldername],
            ext: 'ts',
            tasks: ['development-compile']
        }).on('start', () => {
            if (!started) {
                gulp.start('browser');
                started = true;
            }
        })
    }

    @Task('build', ['production-copy-source-files'])
    build() {
        return gulp.src(this.paths.src.files)
            .pipe(this.tsProjectProd())
            .pipe(gulp.dest(this.paths.prod.folderpath))
    }

    @Task('development-transpile')
    developmentTranspile() {

        var tsResult = gulp.src(this.paths.src.files)
            .pipe(sourcemaps.init())
            .pipe(this.tsProjectDev());

        return tsResult.js
            .pipe(sourcemaps.write('.', {
                // Return relative source map root directories per file.
                sourceRoot: function (file) {
                    var sourceFile = path.join(file.cwd, file.sourceMap.file);
                    return path.relative(path.dirname(sourceFile), file.cwd);
                }
            }))
            .pipe(gulp.dest(this.paths.dev.folderpath));

    }

    @Task('development-copy-source-files')
    developmentCopySourceFiles(cb: Function) {
        this.swagger.generate((success) => {
            gulp.src(this.paths.src.assets)
                .pipe(gulp.dest(this.paths.dev.folderpath))
                .on('end', () => cb());
        });
    }

    @Task('production-copy-source-files')
    productionCopySourceFiles(cb: Function) {
        this.swagger.generate((success) => {
            gulp.src(this.paths.src.assets)
                .pipe(gulp.dest(this.paths.prod.folderpath))
                .on('end', () => cb());
        });
    }

    @SequenceTask('development-compile')
    developmentCompile() {
        return ["development-transpile", "development-copy-source-files"];
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

    @Task()
    default() {
        return ["serve"];
    }

}