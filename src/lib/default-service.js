import appConstants from '../constants/app-constant';
import moment from 'moment';
import lodash from 'lodash';

export default class DefaultService {
  constructor() {
    this._appConstants = appConstants;
  }

  get appConstants() {
    return this._appConstants;
  }

  get moment() {
    return moment;
  }

  get _() {
    return lodash;
  }
}
