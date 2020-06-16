import config from '../config/index';
import preServerConfig from './pre-server.config';
import appConstants from '../constants/app-constant';
import { Db, DbsUrl } from './db';

export class PreServer {
  constructor() {}

  /**
   * @description This function is responsible for connecting/load all the configs before the server starts up
   */

  async connect() {
    try {
      await this._loadFromPreServerConfig();

      console.custom.info(
        appConstants.messsages.server.success.pre_server_connections_setup
      );
    } catch (error) {
      console.custom.error(
        appConstants.messsages.server.error.pre_server_connections_failed,
        error
      );
      throw new Error(error);
    }
  }

  /**
   * @description It loads the configurations from pre-server-config.js
   */

  async _loadFromPreServerConfig() {
    let configs = Object.keys(preServerConfig)
      .map(config => preServerConfig[config].status && config)
      .filter(value => value !== false)
      .sort(
        (conf1, conf2) =>
          preServerConfig[conf1].priority - preServerConfig[conf2].priority
      );

    for (let config of configs) {
      let { fn, args, context } = preServerConfig[config];
      await fn.apply(context ? context : this, [args]);
    }
  }
}
