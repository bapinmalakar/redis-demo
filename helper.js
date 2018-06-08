'use strict';

class Helper {
    constructor() { }

    filterByName(name) {
        let regex = new RegExp(name, 'i');
        console.log('Fake json: ', fakeJsonData.length);
        let data = fakeJsonData.filter(d => {
            if (d.first_name.match(regex)) return d;
        });
        return data;
    }
}

module.exports = new Helper();