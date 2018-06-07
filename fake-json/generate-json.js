'use strict';

const dataSet = require('./data-model');
const [fs, path] = [require('fs'), require('path')];
const writeFile = require('util').promisify(fs.writeFile);
const readFile = require('util').promisify(fs.readFile);
class GenerateData {
    constructor() {
        this.jsonData = [];
        this.json_path = path.resolve(__dirname, '../public/fakeData.json');
    }

    async  generateData() {
        try {
            console.log('Json Path is: ', this.json_path);
            if (fs.existsSync(this.json_path)) {
                return;
            }
            for (let i = 0; i <= 3000; i++) {
                let obj = {};
                obj["first_name"] = dataSet.firstNames[Math.floor(Math.random() * (dataSet.firstNames.length - 0) + 0)];
                obj["last_name"] = dataSet.lastNames[Math.floor(Math.random() * (dataSet.lastNames.length - 0) + 0)];
                obj["prefix"] = dataSet.titles[Math.floor(Math.random() * (dataSet.titles.length - 0) + 0)];
                obj["companies"] = dataSet.companies[Math.floor(Math.random() * (dataSet.companies.length - 0) + 0)];
                obj["email"] = `${obj["first_name"].toLowerCase()}.${obj["last_name"].toLowerCase()}@${Math.floor(Math.random() * (dataSet.tlds.length - 0) + 0)}`;
                obj["phone_number"] = Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111);
                obj["streets"] = dataSet.streets[Math.floor(Math.random() * (dataSet.streets.length - 0) + 0)];
                obj["city"] = dataSet.cities[Math.floor(Math.random() * (dataSet.cities.length - 0) + 0)];
                obj["countrie"] = dataSet.countries[Math.floor(Math.random() * (dataSet.countries.length - 0) + 0)];
                obj["countryCode"] = dataSet.countryCodes[Math.floor(Math.random() * (dataSet.countryCodes.length - 0) + 0)];
                obj["lorem"] = dataSet.lorem[Math.floor(Math.random() * (dataSet.lorem.length - 0) + 0)];
                obj["color"] = dataSet.colors[Math.floor(Math.random() * (dataSet.colors.length - 0) + 0)];
                this.jsonData.push(obj);
                obj = null;
            }
            let writeStream = await writeFile(this.json_path, JSON.stringify(this.jsonData));
            console.log(this.jsonData.length);
        }
        catch (err) {
            console.log('Error occured', err);
        }

    }

    async getJsonData() {
        return await readFile(this.json_path, 'utf-8');
    }

}

module.exports = new GenerateData();