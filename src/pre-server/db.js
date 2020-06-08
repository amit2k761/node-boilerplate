import mongoose from 'mongoose';
import appConstants from '../constants/app-constant';

export class Db {
  constructor() {}

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
