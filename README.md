# Node Express Web Api (NEWA)

This Node Express Web Api using  [Typescript](https://www.typescriptlang.org/) and [Sequelize](http://docs.sequelizejs.com/).

# Installation

This document will give you some information about what tools you will need, to develop and build this project.

Assuming you already have git installed and downloaded the project from it.

### Prerequisites

3- Gulp 

>You will need to install Gulp. We use it to compile and watch our typescript, so that we don´t worry about minor things and focus on development.

### Installing Prerequisites

You can either use `NPM` or `YARN` so.

In case you choose to use `YARN` make sure you already have it install, if you don´t then run:

>``` npm install -g yarn ```

2- Open your favorite console application (Terminal, Command Prompt etc.), run the following command: 

NPM users:
>``` npm install -g gulp ```

YARN users: 
>``` yarn add gulp ```


### Installing Dependencies

To be able to actually run this project you will need to install all the dependencies that are inside of **package.json** file.

To do so run: 

NPM users:
>``` npm install```

YARN users: 
 
>``` yarn install ```

### Runnig the Project 

To run the project type:

>``` gulp serve ```

or
>``` npm run server ```

or

>``` yarn server ```


### Third party libraries

Besides the frameworks mentioned above, other typescript libraries were used. 

 * [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (One of our core libraries, we use on our repository, its perfect for our typescript project.)
 * [@decorators/express](https://www.npmjs.com/package/@decorators/express) (Another great work that helps alot on the creation of controllers.)


