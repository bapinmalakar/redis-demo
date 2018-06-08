'use strict';
const redis = require('./redis/redis-connection');
const promisfy = require('util').promisify;
const asyncRedisGet = promisfy(redis.get).bind(redis);
const asyncRedisSet = promisfy(redis.set).bind(redis);
const asyncHgetall = promisfy(redis.hgetall).bind(redis);
const asyncHmset = promisfy(redis.hmset).bind(redis);
const asyncLpush = promisfy(redis.lpush).bind(redis);
const asyncLrange = promisfy(redis.lrange).bind(redis);

class RdeisFunction {
    constructor() {
        console.log('Redis Function called');
    }

    async getData(key) {
        console.log('Redis fun inside::: ', key);
        return await asyncRedisGet(key);
    }

    async setData(key, value) {
        const data = await asyncRedisSet(key, JSON.stringify(value));
        redis.expire(key, 60);
    }
}

module.exports = new RdeisFunction();