import { Router } from 'express';
import auth from './auth.controller';
import rateLimit from '../../../../utils/rate-limit';

class AuthRoute {
  constructor() {
    this.authRouter = Router();
    this.mountRoute();
  }

  mountRoute() {}
}

export default AuthRoute;
