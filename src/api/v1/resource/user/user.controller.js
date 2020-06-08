import DefaultController from '../../../../lib/default-controller';
import userService from './user.service';

export class UserController extends DefaultController {
  constructor() {
    super();
  }
}

export default new UserController();
