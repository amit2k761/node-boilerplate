import * as _ from 'lodash';
import constants from '../constants/app-constant'

export default class SqlService {
    constructor(model){
        this._model = model;
    }

    async find(queryObj,params) {
        return this._model.find(queryObj,params,{skip:constants.properties.skip,limit:constants.properties.limit});
    }

    async get(id){
        return await this._model.findOne({_id:id});
    }

    async create(data,params) {
        return this._model.create(data);
    }

    async remove(id, params) {
        return this._model.remove({_id:id},params)
    }

    async update(id, data, params) {
        return this._model.findOneAndUpdate({_id:id},data,params);
    }

}