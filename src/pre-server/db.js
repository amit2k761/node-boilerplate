import mongoose from 'mongoose';
import appConstants from '../constants/app-constant';
import Sequelize from 'sequelize';
import {sequelize} from "../lib/connection";
export class Db {
  constructor() {
  }

  async connectDbs(dbConnections) {
    try{
      dbConnections.forEach(async dbObj =>{
        let dbName = Object.keys(dbObj);
        switch(dbName[0]){
          case 'mongo':
            await this._connectMongoDb(dbObj.mongo.url);
            break;
          case 'mysql':
            await this._connectMySqlDB(dbObj.mysql.properties);
            break;
        }
      })
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.all_db_connections_failed,
        error
      );
      throw new Error(error);
    }
  }

  async _connectMySqlDB(dbObj){
    try {
        await sequelize.sync();
        console.custom.info(
          appConstants.messsages.server.success.sql_connected
        );
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.sql_connection_failed,
        error
      );
      throw new Error(error);
    }
  }

  async _connectMongoDb(url) {
    try {
      if (url) {
        await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        });
        console.custom.info(
          appConstants.messsages.server.success.mongodb_connected
        );
      }
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.mongodb_connection_failed,
        error
      );
      throw new Error(error);
    }
  }
}
