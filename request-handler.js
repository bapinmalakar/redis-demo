'use strict';
const redisFun = require('./redis-function');
const redis = require('./redis/redis-connection');
const helper = require('./helper');

class RequestHandler {
    constructor() {
        console.log('Request Handler initiate');
    }
    async getNamee(req, res) {
        try {
            if (!redis.connected)
                throw new Error({code: 'redis-disconnect', error: 'redis server closed'});
            const requestUrl = `${req.hostname}${req.originalUrl}`;
            // throw new Error('Error occure');
            const key = Buffer.from(requestUrl).toString('base64');
            console.log('Key: ', key);
            let data = await redisFun.getData(key);
            if (data) {
                console.log('Alredy compute data with same url');
                res.status(200).send({ status: 200, process: 'OK', msg: JSON.parse(data) });
            }
            else {
                console.log('Process or prepare data');
                data = helper.filterByName(req.params.name);
                await redisFun.setData(key, data);
                res.status(200).json({ status: 200, process: 'CREATED', msg: data });
            }
        } catch (err) {
            console.log('vvvvvvv', err);
            res.status(500).json({ status: 500, msg: 'some error occured' });
        }
    }
    async defaultRoutr(req, res) {
        res.status(404).json({ status: 304, process: 'Not Modified', msg: '' })
    }
}
module.exports = new RequestHandler();