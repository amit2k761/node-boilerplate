import DefaultService from '../../../../lib/default-service';
import User from '../user/user.model';
import authSettings from '../../../../config/auth-settings';
import roleService from '../role/role.service';
import { createToken } from '../../../../utils/jwt-token';
import userService from '../user/user.service';

class AuthService extends DefaultService {
  constructor() {
    super();
  }
}

export default new AuthService();
