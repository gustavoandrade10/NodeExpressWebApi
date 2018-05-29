const SWAGGERCONFIG = require('./swagger.config');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

class SwaggerGenerator {

    constructor() {
        this.decorators = {
            param: '@Params(',
            body: '@Body()',
            controller: '@Controller(',
            get: '@Get(',
            post: '@Post(',
            update: '@Put(',
            delete: '@Delete(',
            description: '@description'
        }
        this.baseDecoratorsHelpers = {
            '@Get(': 'get', '@Post(': 'post',
            '@Put(': 'put', '@Delete(': 'delete'
        }

        this.hasAuthorize = false;
        this.swagger = SWAGGERCONFIG.swaggerDefinition;
        this.swagger.tags = [];
        this.swagger.paths = {};
        this.swagger.definitions = {};

        // Array to hold the models definitions, it will remove the modelName
        // if controllers uses that model as part of @Body decorator
        this.modelsDefinitionsNames = [];
    }

    generate(callback) {

        try {
            this.createModelDefinitions(() => {

                let controllersFolderPath = path.join(process.cwd(), SWAGGERCONFIG.controllersFolderPath);

                if (fs.existsSync(controllersFolderPath)) {
                    fs.readdir(controllersFolderPath, (err, filenames) => {
                        if (err) {
                            this.onError(err);
                            return;
                        }

                        filenames.forEach((filename, index) => {

                            this.processFile(controllersFolderPath + filename, (response) => {

                                if (response && index == filenames.length - 1) {

                                    // Removes models definitions that are not being used.
                                    this.modelsDefinitionsNames.forEach(modelname => {
                                        delete this.swagger.definitions[modelname];
                                    });

                                    fs.writeFile(path.join(process.cwd(), SWAGGERCONFIG.outputFile), JSON.stringify(this.swagger), { flag: 'w' }, (err) => {
                                        if (err) {
                                            console.log('Could not generate swagger docs.');
                                            return false;
                                        }

                                        callback(true);
                                    });

                                }
                            });

                        });

                    });
                } // Controllers

            }); // Models
        }
        catch (e) {
            callback(false);
        }
    }

    /**
     * private method
     * @returns void
     * @param {string} inputFile 
     * @param {Function} callback 
     */
    processFile(inputFile, callback) {

        let instream = fs.createReadStream(inputFile),
            rl = readline.createInterface(instream, new stream.Writable);

        let mainRoutePath = '';
        let arrayOfLinesForDecorator = []; // Contains all lines information for a specific route
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
            else if (line.indexOf(this.decorators.description) > -1) {
                arrayOfLinesForDecorator.push(line);
            }

            // Will enter here on the next line after the line of the decorator.
            if (arrayOfLinesForDecorator.length > 1 && (arrayOfLinesForDecorator[arrayOfLinesForDecorator.length - 1].indexOf(currentDecorator) < 0 || arrayOfLinesForDecorator[arrayOfLinesForDecorator.length - 2].indexOf(currentDecorator) < 0)) {
                this.createPath(arrayOfLinesForDecorator, currentDecorator, mainRoutePath);
                arrayOfLinesForDecorator = [];
            }

        });

        rl.on('close', (line) => {
            callback(true);
        });
    }

    /**
     * private field
     * @returns string
     * @param {string} line 
     */
    createSwaggerTags(line) {

        let controllerRoute = line.substr(line.indexOf(this.decorators.controller));
        controllerRoute = controllerRoute.substring(12, controllerRoute.indexOf(')')); //@Controller <-- 12 caracters

        if (controllerRoute.toLowerCase().indexOf('[authorize]') > -1)
            this.hasAuthorize = true;
        else
            this.hasAuthorize = false;

        // Remove middlewares
        if (controllerRoute.indexOf(',') > -1 && controllerRoute.indexOf('[') > -1 && controllerRoute.indexOf(']') > -1) {
            controllerRoute = controllerRoute.substring(0, controllerRoute.indexOf('['));
            controllerRoute = controllerRoute.substring(controllerRoute.indexOf(']'));
        }

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

    /**
     * private asycn method
     * @returns void
     * @param {string[]} arrayOfLinesForDecorator 
     * @param {string} decorator 
     * @param {string} mainRoutePath 
     */
    async createPath(arrayOfLinesForDecorator, decorator, mainRoutePath) {

        let hasAuthentication = this.hasAuthorize;
        let routeName = '';
        let params = [];
        let summary = '';
        await arrayOfLinesForDecorator.forEach(line => {

            // extract routename from @Get('routname') decorator and concat with mainRout define in @Controller('mainroute').
            if (line.indexOf(decorator) > -1) {
                routeName = line.substr(line.indexOf(decorator));
                routeName = routeName.substring(decorator.length, routeName.indexOf(')'));

                if (!hasAuthentication && routeName.toLowerCase().indexOf('[authorize]') > -1)
                    hasAuthentication = true;

                // Remove middlewares
                if (routeName.indexOf(',') > -1 && routeName.indexOf('[') > -1 && routeName.indexOf(']') > -1) {
                    routeName = routeName.substring(0, routeName.indexOf('['));
                    routeName = routeName.substring(routeName.indexOf(']'));
                }

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
            else if (line.indexOf(this.decorators.description) > -1) {
                summary = line.substr(line.indexOf(this.decorators.description));
                summary = summary.substring(this.decorators.description.length).trim();
            }
            // Extract the params from the method
            else {

                if (line.indexOf(this.decorators.param) > -1) {
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

                // @Body
                if (line.indexOf(this.decorators.body) > -1) {

                    let bodyPos = line.indexOf(this.decorators.body);
                    let bodyLine = line.substring(this.decorators.body.length + bodyPos);

                    let bodyPropertyValue = bodyLine.substr(0, bodyLine.indexOf(':')).trim();
                    let bodyPropertyType = bodyLine.substr(bodyLine.indexOf(':')).replace(/[:;){]/g, "").trim();

                    // Removes the models that are in use.
                    var index = this.modelsDefinitionsNames.indexOf(bodyPropertyType);
                    if (index !== -1) {
                        this.modelsDefinitionsNames.splice(index, 1);
                    }

                    params.push({
                        in: "body",
                        name: bodyPropertyValue,
                        required: true,
                        schema: {
                            $ref: "#/definitions/" + bodyPropertyType
                        }
                    });
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

        // Add summary
        if (summary.length > 0) {
            this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].summary = summary;
        }

        // Add Security
        if (hasAuthentication) {
            this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].security = [
                {
                    jwt: []
                }
            ];

            // Add Response 401 for security
            if (!this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].responses)
                this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].responses = {};

            this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].responses['401'] = {
                description: 'Authorization has been denied for this request.'
            }
        }

        // Add Consumes and Produces
        this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].consumes = ['application/json'];
        this.swagger.paths[routeName][this.baseDecoratorsHelpers[decorator]].produces = ['application/json'];

        // Add Security Definitions, this will make the green authorize and the modal appears.
        if (!this.swagger.securityDefinitions && hasAuthentication) {
            this.swagger.securityDefinitions = {
                jwt: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        }

    }

    /**
     * private method
     * @returns void
     * @param {Function} callback 
     */
    createModelDefinitions(callback) {

        let modelsFolderPath = path.join(process.cwd(), SWAGGERCONFIG.modelsFolderPath);

        if (fs.existsSync(modelsFolderPath)) {
            fs.readdir(modelsFolderPath, (err, filenames) => {
                if (err) {
                    this.onError(err);
                    return;
                }

                filenames.forEach((filename, index) => {

                    this.processModelFiles(modelsFolderPath + filename, (response) => {

                        if (response && index == filenames.length - 1) {
                            callback(response);
                        }
                    });

                });

            });
        }
    }


    /**
     * private method
     * @returns void
     * @param {string} inputFile 
     * @param {Function} callback 
     */
    processModelFiles(inputFile, callback) {

        let instream = fs.createReadStream(inputFile),
            rl = readline.createInterface(instream, new stream.Writable);

        let classTag = 'class';
        let modelName = '';
        let isSearchingForColumnBracketsEnd = false, foundProperty = false;
        let hideProperty = false;

        rl.on('line', (line) => {

            if (line.indexOf(classTag) > -1) {
                modelName = line.substr(line.indexOf(classTag));
                modelName = modelName.substring(classTag.length, modelName.indexOf('extends')).trim();
                // Adds models to keep track of them.
                this.modelsDefinitionsNames.push(modelName);

                if (!this.swagger.definitions)
                    this.swagger.definitions = {};

                // Creates definition
                this.swagger.definitions[modelName] = {
                    type: 'object',
                    properties: {}
                };
            }

            // Wil only enter here on the next line after enter on #1, #2
            if (foundProperty) {

                if (!hideProperty) {
                    let propertyValue = line.substr(0, line.indexOf(':')).trim();
                    let propertyType = line.substr(line.indexOf(':')).replace(/[:;]/g, "").trim();

                    // validations
                    propertyType = propertyType.toLowerCase() == 'date' ? 'date-time' : propertyType;

                    this.swagger.definitions[modelName].properties[propertyValue] = {
                        type: propertyType
                    }
                }
                else {
                    hideProperty = false;
                }

                foundProperty = false;
            }

            if (line.indexOf('@swaggerhideproperty') > -1) {
                hideProperty = true;
            }

            // #1
            if (line.indexOf('@Column') > -1 && line.indexOf('({') > -1) {
                isSearchingForColumnBracketsEnd = true;
            }

            // #2
            if (isSearchingForColumnBracketsEnd && line.indexOf('})') > -1) {
                isSearchingForColumnBracketsEnd = false;
                foundProperty = true;
            }

        });

        rl.on('close', (line) => {
            callback(true);
        });
    }

    /**
     * private method
     * @returns void
     * @param {NodeJS.ErrnoException} err 
     */
    onError(err) {
        console.log('Could not find docs folder for swagger docs.');
    }

    /**
     * private method
     * @returns string
     * @param {string} name 
     */
    capitalizeName(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
    }
}

module.exports = new SwaggerGenerator();