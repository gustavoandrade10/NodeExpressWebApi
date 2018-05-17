
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './Config/swagger.json';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as expressPromise from 'express-promise';
import { Sequelize } from 'sequelize-typescript';
import { attachControllers } from '@decorators/express';

//Import Controllers
import { ExampleEmployeeController } from './Controller/Controllers/ExampleEmployeeController';
import { ExampleProjectController } from './Controller/Controllers/ExampleProjectController';
import { ExampleUserController } from './Controller/Controllers/ExampleUserController';

class Server {

    // set app to be of type express.Application
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // application config
    config(): void {

        let env = process.env.NODE_ENV || 'development';
        let config = require(__dirname + '/Config/config.json')[env];

        new Sequelize({
            host: config.host,
            database: config.database,
            dialect: config.dialect,
            username: config.username,
            password: config.password,
            modelPaths: [__dirname + '/Models/**'],
            operatorsAliases: false
        });

        // express middleware
        this.app.use(expressPromise());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());

        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("Access-Control-Allow-Headers", "Authorization");
            next();
        });

    }

    // application routes
    routes(): void {
        const router: express.Router = express.Router();

        attachControllers(router, [ExampleEmployeeController, ExampleProjectController, ExampleUserController]);
        
        
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/api/v1', router);

    }
}

// export
export default new Server().app;