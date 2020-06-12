import appConstants from '../constants/app-constant';
import moment from 'moment';
import lodash from 'lodash';
import DbService from './db-service';

export default class DefaultService extends DbService {
  constructor(model,type) {
    super(model,type);
    this._appConstants = appConstants;
  }

  getAll = async (queryObj,params) => {
    return super.find(queryObj,params)
	};

	get = async (id,projection) => {
		return super.get(id,projection);
	};

	create = async (Obj,params) => {
		return super.create(Obj,params);
	};

	remove = async (Id,params) => {
		return super.remove(Id,params);
	}

	update = async(id,Obj,params) => {
		return super.update(id,Obj,params);
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
