import * as _ from 'lodash';

export default class SqlService {
    constructor(model){
        this._model = model;
    }

    async find(queryObj,params) {
        let {limit,skip,sort,...filter} = queryObj;
        return this._model.find(filter,params).skip(Number(skip) | 0).limit(Number(limit) | 10).sort(sort); // sort is conditional
    }

    async get(id,params){
        return await this._model.findOne({_id:id},params);
    }

    async create(data,params) {
        return this._model.create(data,params);
    }

    async remove(id, params) {
        return this._model.findOneAndDelete({_id:id},params)
    }

    async update(id, data, params) {
        return this._model.findOneAndUpdate({_id:id},data,params);
    }

}