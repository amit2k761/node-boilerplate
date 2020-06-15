import * as _ from 'lodash';
import constants from '../constants/app-constant';
import util from 'util';
import MongooseService from './mongoose-service';
import SequelizeService from './sequelize-service';
export default class DbService {
  constructor(model, type) {
    this._model = model;
    this._type = type;
    this._extendOrmService();
  }

  _extendOrmService() {
    switch (this._type) {
      case 'Mongoose':
        util.inherits(DbService, MongooseService);
        break;
      case 'Sequelize':
        util.inherits(DbService, SequelizeService);
        break;
    }
  }
}
