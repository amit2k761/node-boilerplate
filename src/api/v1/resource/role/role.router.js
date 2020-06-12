import { Router } from 'express';
import role from './role.controller';
import isAuthorized from '../../../../middleware/authorization.middleware';
import roleConstant from '../../../../constants/roles';

class RoleRoute {
  constructor() {
    this.roleRouter = Router();
    this.mountRoute();
  }

  mountRoute() {
    //this.roleRouter.use(isAuthorized([roleConstant.ROLE_SUPER_ADMIN]));
    this.roleRouter.get('/', role.getRoles);
    this.roleRouter.post('/', role.createRole);
  }
}

export default RoleRoute;
