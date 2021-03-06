'use strict';
console.log('Inside redis');
const redis = require('redis');
const retry_options = function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        if(options.attempt > 20){
            return new Error({code: 'redis-disconnect', msg: 'try after some time!'});
        }
        return 1000;
        
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
}

const client = redis.createClient('redis://127.0.0.1:6379');

client.on('connect', () => console.log('Redis server connected'));
client.on('error', (err) => console.log('Redis connection error: ', err));
client.on('reconnecting', () => console.log('Redis reconnecting to redis'));

module.exports = client;