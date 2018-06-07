'use strict';
const redis = require('./redis/redis-connection');
const promisfy = require('util').promisify;
const asyncRedisGet = promisfy(redis.get).bind(redis);
const asyncRedisSet = promisfy(redis.set).bind(redis);
const asyncRedisLrange = promisfy(redis.lrange).bind(redis);
const asyncRedisRpush = promisfy(redis.rpush).bind(redis);

class RdeisFunction {
    constructor() {
        console.log('Redis Function called');
    }

    async getData(key) {
        console.log('Redis fun inside::: ', key);
        return await asyncRedisLrange(key, 0, -1);
    }

    async setData(key, value) {
        return await asyncRedisRpush.apply(redis, [key].concat(value));
    }
}

module.exports = new RdeisFunction();