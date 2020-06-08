import validateEnv from './validate-env';
import { RedisCache } from './cache';
import { Db } from './db';
import config from '../config/index';
import CronJobs from './cron';

/**
 * @description The config object defines/holds following properties.
 * priority: Priority in which the entity will load.
 * status: Whether to load or not. If false following entity wont load.
 * fn:The function to load the entity.Please make sure its a function and not function call.
 * args:The argument to be passed to that function.
 * context: "THIS" context for the function.
 */

export default {
  validateEnv: {
    priority: 1,
    status: false,
    fn: validateEnv,
    args: [],
    context: null
  },
  db: {
    priority: 2,
    status: false,
    fn: new Db().connectDbs,
    args: [
      {
        mongo: { url: config.dataBaseUrl }
      }
      /**
       * Pass null in url to stop connecting to mongo. To add sql connection simply add to args array
       * in the format above and pass url
       */
    ],
    context: new Db()
  },
  redis: {
    priority: 3,
    status: false,
    fn: new RedisCache().connectRedis,
    args: [],
    context: new RedisCache()
  },
  cron: {
    priority: 4,
    status: false,
    fn: new CronJobs().startCronJobs,
    args: [],
    context: new CronJobs()
  }
};
