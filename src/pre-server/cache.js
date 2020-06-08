import mongoose from 'mongoose';
import redis from 'redis';
import util from 'util';
import config from '../config/index';
const client = redis.createClient({
  host: config.redis_host,
  port: config.redis_port
});

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

// hget is use to pull information from a nested hash

export const clearHash = function(hashKey) {
  client.del(JSON.stringify(hashKey));
};

export class RedisCache {
  constructor() {
    this.init();
  }

  init() {
    mongoose.Query.prototype.cache = function(options) {
      this.useCache = true;
      this.cacheHashKey = JSON.stringify(options.key || '');
      return this;
    };

    mongoose.Query.prototype.exec = async function() {
      if (!this.useCache) {
        console.log('this query is not cached and returning from database');
        return exec.apply(this, arguments);
      }

      //console.log("get query", this.getQuery());
      // to get the query object

      //console.log(this.mongooseCollection.name);
      //to get the colelction name

      // combine the colelction name with the query obeject

      const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
          collection: this.mongooseCollection.name
        })
      );

      //console.log("cache key is =======>", key);

      // see if we have a value for a key in redis
      const cacheValue = await client.hget(this.cacheHashKey, key);
      console.log('cacheValue', cacheValue);
      // if we do return that
      if (cacheValue) {
        console.log('value is cached and returning from cache =====>');
        const mongooseDoc = JSON.parse(cacheValue);
        return Array.isArray(mongooseDoc)
          ? mongooseDoc.map(doc => new this.model(doc))
          : new this.model(mongooseDoc);
      }
      // otherwise issue the query and store aandd the result
      const result = await exec.apply(this, arguments);
      console.log('value is not cached and returning from mongodb======>');
      client.hset(this.cacheHashKey, key, JSON.stringify(result));
      console.log('value is now added to cache=====>');
      return result;
    };
  }

  async connectRedis() {
    client.on('ready', function() {
      console.custom.info('Redis is ready to run ');
    });

    client.on('error', function() {
      console.custom.error('Error in Redis while running');
    });
  }
}
