import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { StudentController } from './Controller/Controllers/StudentController';
import { Sequelize } from 'sequelize-typescript';

//Import Controllers

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
        let config = require(__dirname + '/Repository/config/config.json')[env];

        new Sequelize({
            host: config.host,
            database: config.database,
            dialect: config.dialect,
            username: config.username,
            password: config.password,
            modelPaths: [__dirname + '/Repository/models']
        });

        // express middleware
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
            next();
        });

    }

    // application routes
    routes(): void {
        const router: express.Router = express.Router();
        const studentController = new StudentController();

        this.app.use('/', router);
        this.app.use('/api/v1/users', studentController.router);
    }
}

// export
export default new Server().app;