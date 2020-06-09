import mongoose from 'mongoose';
import * as _ from 'lodash';

export default class DbService {
    constructor(model){
        this._model = model;
    }

    async find(params) {
        let obj = await this._model.find(params);
        obj = obj.map(item => _.pick(item,Object.keys(this._model.schema.paths)))        
        return obj;
    }

    async get(id){
        let obj = await this._model.findOne({
            _id:mongoose.Types.ObjectId(id)
        });
        obj = _.pick(obj,Object.keys(this._model.schema.paths))       
        return obj;
    }

    async create(data) {
        let obj = this._model(data);
        return new Promise((resolve,reject)=>{
            obj.save((err,response)=>{
                if(err){
                    throw new Error(err);
                }
                let filtered = _.pick(response,Object.keys(this._model.schema.paths));
                resolve(filtered);
            });
        })
    }

    async remove(id, params) {
        return this._model.remove({
            _id:mongoose.Types.ObjectId(id)
        },params)
    }

    async update(id, data, params) {
        let updatedObj = this._model.updateMany({
            _id:mongoose.Types.ObjectId(id)
        },data,params);
        return updatedObj;
    }
}