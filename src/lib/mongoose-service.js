import * as _ from 'lodash';

export default class MongooseService {
  async find(queryObj = {}, params = {}) {
    let { limit, skip, select } = params;
    params = _.omit(params, ['limit', 'skip', 'select']);

    return this._model
      .find(queryObj, select, params)
      .skip(+skip || 0)
      .limit(+limit || 10);
  }

  async get(id, params = {}) {
    let { select } = params;
    params = _.omit(params, ['select']);
    return await this._model.findOne({ _id: id }, select, params);
  }

  async create(data, params) {
    return this._model.create(data, params);
  }

  async remove(id, params) {
    return this._model.findOneAndDelete({ _id: id }, params);
  }

  async update(id, data, params) {
    return this._model.findOneAndUpdate({ _id: id }, data , {new: true,...params});
  }
}
