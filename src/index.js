import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import expressStatusMonitor from 'express-status-monitor';
import morgan from 'morgan';

import config from './config/index';
import appConstants from './constants/app-constant';
import attachGlobals from './globals/index';
import { PreServer } from './pre-server/pre-server-connections';
import logger from './utils/logger';
import Schematics from './lib/schematics/';

import Api from './api';

import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

class App {
  constructor() {
    this._app = express();
    this._preMiddlewares();
    this._routes();
    this._postMiddlewares();
  }

  /**
   *  App Configuration
   *  App Configuration section, mount the middleware functions from the packages that you are importing into this entry point module
   */

  _preMiddlewares() {
    this.app.use(expressStatusMonitor({ path: config.status_chart_route }));
    this.app.use(morgan('combined', { stream: logger.stream }));
    this._app.use(compression());
    this._app.use(helmet());
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(passport.initialize());
  }

  /**
   * api routes
   */

  _routes() {
    this._app.use('/api', new Api().apiRouter);
  }

  /**
   * Post middlewares. Run after routes. Specifally for handle errors and not found middleware.
   */

  _postMiddlewares() {
    this._app.use(errorHandler);
    this._app.use(notFoundHandler);
  }

  get app() {
    return this._app;
  }
}

/**
 * Two modes to run the express- app
 * 1- For creating schematics
 * 2-Any other case in run server by default
 */

if (process.env.npm_config_create) {
  new Schematics();
} else {
  const app = new App().app;

  app.listen(config.port, async () => {
    try {
      //Attach globals to global object
      attachGlobals();
      //Setup and connect all the preserver requirements before the node server is up
      await new PreServer().connect();

      console.custom.info(
        `${appConstants.messsages.server.success.server_started} ${config.backend_url}: ${config.port}`
      );
    } catch (error) {
      console.log(appConstants.messsages.server.error.server_failed, error);
      process.exit(1);
    }
  });

  process.on('unhandledRejection', error => {
    console.log('*****unhandled rejection*****', error);
  });
}
