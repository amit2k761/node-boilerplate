import { merge } from 'lodash';
import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

class Config {
  envConfig = {};
  env;

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.mergeDefaultConfigs();
    this.mergeEnvConfigs();
  }

  mergeDefaultConfigs() {
    this.envConfig = merge(this.envConfig, {
      env,
      isDev: env === 'development',
      isTest: env === 'testing',
      isProd: env === 'production',
      isStage: env === 'staging'
    });
  }

  mergeEnvConfigs() {
    let config = {};

    switch (this.env) {
      case 'dev':
      case 'development':
        config = require('./dev').config;
        break;
      case 'prod':
      case 'production':
        config = require('./prod').config;
        break;
      case 'stage':
      case 'staging':
        config = require('./stage').config;
        break;
      case 'test':
      case 'testing':
        config = require('./test').config;
        break;
    }

    this.envConfig = merge(this.envConfig, config);
  }
}

export default new Config().envConfig;
