import appConstants from '../constants/app-constant';
import moment from 'moment';
import lodash from 'lodash';
import DbService from './db-service';

export default class DefaultService extends DbService {
  constructor(model) {
    super(model);
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
