import { SWAGGERCONFIG } from "./swagger.config";
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as stream from 'stream';

export class SwaggerGenerator {

    private swagger: any;
    private decorators = {
        param: '@Params(',
        controller: '@Controller(',
        get: '@Get(',
        post: '@Post(',
        update: '@Put(',
        delete: '@Delete('
    }

    private baseDecoratorsHelpers = {
        '@Get(': 'get', '@Post(': 'post',
        '@Put(': 'put', '@Delete(': 'delete'
    }

    constructor() {
        this.swagger = SWAGGERCONFIG.swaggerDefinition;
    }

    generate() {

        let controllersFolderPath = path.join(process.cwd(), SWAGGERCONFIG.controllersFolderPath);

        if (fs.existsSync(controllersFolderPath)) {
            fs.readdir(controllersFolderPath, (err: NodeJS.ErrnoException, filenames: string[]) => {
                if (err) {
                    this.onError(err);
                    return;
                }

                filenames.forEach((filename, index) => {

                    this.processFile(controllersFolderPath + filename, (response: boolean) => {

                        if (response && index == filenames.length - 1) {

                            fs.writeFile(path.join(process.cwd(), "src", "Config", "docs", "teste.json"), JSON.stringify(this.swagger), { flag: 'w' }, (err) => {
                                if (err) {
                                    return console.log(err);
                                }

                                console.log("The file was saved!");
                            });

                        }
                    });

                });

            });
        }
    }

    private processFile(inputFile: string, callback: Function) {

        let instream = fs.createReadStream(inputFile),
            rl = readline.createInterface(instream, new stream.Writable);

        let oldLine = '', mainRoutePath = '';
        let arrayOfLinesForDecorator: string[] = []; // Contains all lines information for a specific route
        let currentDecorator = ''; // the current decorator that is being getting information from.

        rl.on('line', (line) => {

            // Will add another line after enter decorator
            if (arrayOfLinesForDecorator.length > 0) {
                arrayOfLinesForDecorator.push(line);
            }

            if (line.indexOf(this.decorators.controller) > -1) {
                mainRoutePath += this.createSwaggerTags(line);
            }
            else if (line.indexOf(this.decorators.get) > -1) {
                currentDecorator = this.decorators.get;
                arrayOfLinesForDecorator.push(line);
            }
            else if (line.indexOf(this.decorators.post) > -1) {
                currentDecorator = this.decorators.post;
                arrayOfLinesForDecorator.push(line);
            }
            else if (line.indexOf(this.decorators.update) > -1) {
                currentDecorator = this.decorators.update;
                arrayOfLinesForDecorator.push(line);
            }
            else if (line.indexOf(this.decorators.delete) > -1) {
                currentDecorator = this.decorators.delete;
                arrayOfLinesForDecorator.push(line);
            }

            // Will enter here on the next line after the line of the decorator.
            if (arrayOfLinesForDecorator.length > 1 && arrayOfLinesForDecorator[arrayOfLinesForDecorator.length - 1].indexOf(currentDecorator) < 0) {
                this.createPath(arrayOfLinesForDecorator, currentDecorator, mainRoutePath);
                arrayOfLinesForDecorator = [];
            }

            oldLine = line;
        });

        rl.on('close', (line) => {
            callback(true);
        });
    }

    private createSwaggerTags(line: string): string {

        let controllerRoute = line.substr(line.indexOf(this.decorators.controller));
        controllerRoute = controllerRoute.substring(12, controllerRoute.indexOf(')')); //@Controller <-- 12 caracters

        controllerRoute = controllerRoute.toLowerCase().replace('[authorize]', '');
        controllerRoute = controllerRoute.replace(/[^A-Za-z;//]/g, ""); // remove semicons, singlequotes, etc...

        let controllerName = controllerRoute.split('/')[1];

        // Creates tags
        if (!this.swagger.tags)
            this.swagger.tags = [];

        this.swagger.tags.push({
            name: controllerName,
            description: 'Api for ' + this.capitalizeName(controllerName)
        });

        return controllerRoute;
    }

    private async createPath(arrayOfLinesForDecorator: string[], decorator: string, mainRoutePath: string) {

        let routeName = '';
        let params: object[] = [];
        await arrayOfLinesForDecorator.forEach(line => {

            // extract routename from @Get('routname') decorator and concat with mainRout define in @Controller('mainroute').
            if (line.indexOf(decorator) > -1) {
                routeName = line.substr(line.indexOf(decorator));
                routeName = routeName.substring(decorator.length, routeName.indexOf(')'));

                routeName = routeName.toLowerCase().replace('[authorize]', '');
                routeName = routeName.replace(/[^A-Za-z;://]/g, ""); // remove semicons, singlequotes, etc...

                // Replaces all the params dots for curly brackest. example: :teste/:id => {teste}/{id}
                while (routeName.indexOf(':') > -1) {
                    let twoDotsParamPos = routeName.indexOf(':');
                    let endOfParamPos = routeName.substr(twoDotsParamPos).indexOf('/');

                    if (endOfParamPos > -1)
                        routeName = routeName.slice(0, twoDotsParamPos) + '{' + routeName.substr(twoDotsParamPos, endOfParamPos).replace(':', '') + '}' + routeName.substr(twoDotsParamPos + endOfParamPos);
                    else
                        routeName = routeName.slice(0, twoDotsParamPos) + '{' + routeName.substr(twoDotsParamPos).replace(':', '') + '}';
                }

                routeName = mainRoutePath + routeName;
            }
            // Extract the params from the method
            else if (line.indexOf(this.decorators.param) > -1) {
                let lineRef = line;

                while (lineRef.indexOf(this.decorators.param) > -1) {

                    let paramPos = lineRef.indexOf(this.decorators.param);
                    let paramName = lineRef.substr(paramPos);
                    paramName = paramName.substring(this.decorators.param.length, paramName.indexOf(')'));

                    paramName = paramName.replace(/[^A-Za-z;]/g, ""); // remove semicons, singlequotes, etc...
                    params.push({
                        name: paramName,
                        in: 'path',
                        required: true,
                        description: `${paramName} to find`,
                        type: 'string'
                    });

                    lineRef = lineRef.substr(paramPos + this.decorators.param.length);
                }
            }

        });

        if (!this.swagger.paths)
            this.swagger.paths = {};

        if (!this.swagger.paths[routeName])
            this.swagger.paths[routeName] = {};
            
        this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]] = {
            tags: [
                mainRoutePath.split('/')[1]
            ]
        }

        // Add parameters
        if (params.length > 0) {
            this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].parameters = params;
        }

    }

    private onError(err: NodeJS.ErrnoException) {
        console.log(err.message);
    }

    private capitalizeName(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
    }
}