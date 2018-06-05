# Node Express Web Api (NEWA)

A Node Express Web Api (NEWA) using [Typescript](https://www.typescriptlang.org/) and [Sequelize](http://docs.sequelizejs.com/) *( [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript)).

# Installation

 Node.js 
 
>Install [Node.js](https://nodejs.org/), recomended to download any stable version above 8.11.1


Then install gulp and NEWA CLI.
```sh
npm install gulp-cli --g

npm install newa -g
```


## Newa new and generate.

Create a project, generate model, repository, business and controller.

### New command

```sh
newa n|new your-project-name --e|--example
```

The above command will create a new project by the name of ```your-project-name``` the flag ```--e|--example``` is optional and if used, it will create an example project.

### Generate command

```sh
newa g|generate [<type>] [<modelname>]
```

### Details

Automatically create project and [MRBC](####DEFINITIONS) for your project.

The generated files are all based on a existent ```Model```, so you have to create the ```Model``` first. 

For example, ```newa generate model user``` creates a model by the name of ```User``` in ```src/Models/Database/```.

```newa generate repository user``` creates a repository by the name of ```UserRepository``` in ```src/Repository/Repositories/``` .

```newa generate business user``` creates a business by the name of ```UserBusiness``` in ```src/Business/Rules/``` .

```newa generate controller user``` creates a controller by the name of ```UserController``` in ```src/Controller/Controllers/``` .

```newa generate all user``` creates a model, repository, business and controller .

| Input        | Description          
| ------------- | -------------
| ```type```      | The type of generator (e.g. model, repository, business, controller)
| ``modelname``    | The name of the model.   



| Option        | Description          
| ------------- | -------------
| ```--t\|--table my-table-name```      | Generates a model refering to a diferent table name, instead of using model name as table name.
| ``--env\|--environment my-environment``    | Sets the environment (production, development, local) to be used when generating a model.    

### Examples 

```sh
newa new <projectname> --example

newa generate model <modelname> --table <tablename> --environment  <enviromentname>

newa generate repository <modelname>

newa generate business <modelname>

newa generate controller <modelname>

newa generate all <modelname> --table <tablename> --environment  <enviromentname>

```

shortcuts:

```sh
newa n <projectname> --example

newa g m <modelname> --t <tablename> --env  <enviromentname>

newa g r <modelname>

newa g b <modelname>

newa g c <modelname>

newa g a <modelname> --t <tablename> --env <enviromentname>

```

### Resources (available just for example project).

You can find a dump file of the database and postman resources that were used in this project on **"resources/"** folder.

Just import them and you are good to go.

### Third party libraries

Besides the frameworks mentioned above, some typescript libraries were used. 

 * [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (The core librarie of the project, it is used on the repository to create squelize typescript models.)
 * [@decorators/express](https://www.npmjs.com/package/@decorators/express) (Another core librarie used on controllers.)

