import { Router } from 'express';
import user from './user.controller';
import isAuthorized from '../../../../middleware/authorization.middleware';

class UserRoute {
  constructor() {
    this.userRouter = Router();
    this.mountRoute();
  }

  mountRoute() {}
}

export default UserRoute;
