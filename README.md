# Node Express Web Api (NEWA)

A Node Express Web Api (NEWA) using [Typescript](https://www.typescriptlang.org/) and [Sequelize](http://docs.sequelizejs.com/) *( [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript)).

# Installation

This document will give you some information about what tools you will need, to develop and build this project.

So first clone or download this repository.

### Prerequisites

1- Node.js 
 
>First you need to install [Node.js](https://nodejs.org/), recomended to download any stable version above 8.11.1

2- Gulp 

>Gulp is used to compile typescript into es6 javascript, server the application and watch for changes, so that you don´t worry about minor things. 


### Installing Prerequisites


If you have previously installed a version of gulp globally, please run `npm rm --global` gulp to make sure your old version doesn't collide with gulp-cli

```sh
$ npm install --global gulp-cli
```



### Installing Dependencies

Install the dependencies listed inside of **package.json** file.

```sh
$ npm install 
```

### Runnig the Project 

After you had install [gulp-cli](###-Installing-Prerequisites) run:

```sh
$ gulp serve 
```

Use this command to compile typescripts, watch for changes and server the application.

### Resources.

You can find a dump file of the database and postman resources that were used in this project on **"resources/"** folder.

Just import them and you are good to go.

### Third party libraries

Besides the frameworks mentioned above, some typescript libraries were used. 

 * [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (The core librarie of the project, it is used on the repository to create squelize typescript models.)
 * [@decorators/express](https://www.npmjs.com/package/@decorators/express) (Another core librarie used on controllers.)


### Doing

 - NEWA-CLI to generate models,repositories,business and controllers.