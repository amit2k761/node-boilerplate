import { Router } from 'express';
import V1Route from './v1/index';

class Api {
  constructor() {
    this.apiRouter = Router();
    this.mountRoute();
  }

  mountRoute() {
    this.apiRouter.use('/v1', new V1Route().v1Router);
  }
}

export default Api;
