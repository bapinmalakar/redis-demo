'use strict';
const app = require('express')();
const port = process.env.PORT || 8100;
const jsonData = require('./fake-json/generate-json');

//global variable set...
global.fakeJsonData = [];

jsonData.generateData().then(data => {
  return jsonData.getJsonData()
}).then(readData => { fakeJsonData = JSON.parse(readData); console.log(typeof fakeJsonData) });

//redis connection calling...
const redis = require('./redis/redis-connection');
const requestHandler = require('./request-handler');

app.get('/:name', requestHandler.getNamee);

app.listen(port, () => {
  console.log(`Server Start at port ${port}`);
})