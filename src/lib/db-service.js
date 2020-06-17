import * as _ from 'lodash';
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
        Object.setPrototypeOf(this, MongooseService.prototype);
        break;
      case 'Sequelize':
        Object.setPrototypeOf(this, SequelizeService.prototype);
        break;
    }
  }
}
