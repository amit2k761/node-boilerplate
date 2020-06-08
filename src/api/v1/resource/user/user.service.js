import DefaultService from '../../../../lib/default-service';
import User from '../user/user.model';
import roleService from '../role/role.service';

class UserService extends DefaultService {
  constructor() {
    super();
  }
}

export default new UserService();
