import mongoose from 'mongoose';
import appConstants from '../constants/app-constant';
import Sequelize from 'sequelize';
export class Db {
  constructor() {
  }

  async connectDbs(dbObj) {
    try {
      await this._connectMongoDb(dbObj.mongo.url);
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.all_db_connections_failed,
        error
      );
      throw new Error(error);
    }
  }

  async connectSql(dbObj){
    try {
      await this.connectSqlDB(dbObj);
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.all_db_connections_failed,
        error
      );
      throw new Error(error);
    }
  }

  async connectSqlDB(serverDetails){
    try {
        const sequelize = new Sequelize(serverDetails.DB, serverDetails.USER, serverDetails.PASSWORD, {
          host: serverDetails.HOST,
          dialect: serverDetails.dialect,
          operatorsAliases: serverDetails.operatorsAliases,
          pool: {
            max: serverDetails.pool.max,
            min: serverDetails.pool.min,
            acquire: serverDetails.pool.acquire,
            idle: serverDetails.pool.idle
          }
        });
        const db = {};

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;
        await db.sequelize.sync();
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
