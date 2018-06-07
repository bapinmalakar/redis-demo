'use strict';
const redisFun = require('./redis-function');
const helper = require('./helper');

class RequestHandler {
    constructor() {
        console.log('Request Handler initiate');
    }
    async getNamee(req, res) {
        try {
            console.log('Inside.....', req.hostname);
            const requestUrl = `${req.hostname}${req.originalUrl}`;
            console.log('1111111');
            const key = Buffer.from(requestUrl).toString('base-64');
            console.log('222222');
            let data = await redisFun.getData(key);
            console.log('Data is: ', data);
            if (data) {
                console.log('Alredy compute data with same url');
                return res.status(200).send({ status: 200, process: 'OK', msg: data });
            }
            else {
                console.log('Process or prepare data');
                data = helper.filterByName(req.params.name);
                await redisFun.setData(key, data);
                return res.status(200).json({ status: 200, process: 'CREATED', msg: data });
            }
        } catch (err) {
            res.status(500).json({ status: 500, msg: err });
        }
    }
}
module.exports = new RequestHandler();