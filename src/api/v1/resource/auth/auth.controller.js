import DefaultController from '../../../../lib/default-controller';
import authService from './auth.service';

export class AuthController extends DefaultController {
  constructor() {
    super();
  }
}

export default new AuthController();
