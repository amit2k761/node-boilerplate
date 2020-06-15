import AuthRoute from './resource/auth/auth.router';
import UserRoute from './resource/user/user.router';
import RoleRoute from './resource/role/role.router';

import { Router } from 'express';
import passport from 'passport';

import jwtStrategy from './resource/auth/strategies/jwt-strategy';

jwtStrategy(passport);

export class V1Route {
  constructor() {
    this.v1Router = Router();
    this.mountRoute();
  }

  mountRoute() {
    this.v1Router.use('/auth', new AuthRoute().authRouter);

    //this.v1Router.use(passport.authenticate('jwt', { session: false }));

    this.v1Router.use('/role', new RoleRoute().roleRouter);
    this.v1Router.use('/user', new UserRoute().userRouter);
  }
}

export default V1Route;
