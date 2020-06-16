import * as _ from 'lodash';

export default class SequelizeService {

    async find(queryObj = {}, params = {}) {
        let { limit, skip, select } = params;
        params = _.omit(params, ['limit', 'skip', 'select']);
        return this._model.findAll({
            where:select,
            attributes:queryObj,
            limit: +limit || 10 ,
            offset: +skip || 0
        });
    }

    async get(id,params){
        return await this._model.findOne({where:{id:id},attributes:params});
    }

    async create(data,params) {
        return this._model.bulkCreate(data, {
            returning: true,
            attributes: params
        }); 
    }

    async remove(id, params) {
        return this._model.destroy({
            where:{id:id},
            attributes:params,
            returning:true
        })
    }

    //result will only be returned in case of postgres
    async update(id, data, params) {
        return this._model.update(data,{
            where: {id: id},
            attributes:params,
            returning: true
        },params);
    }
}