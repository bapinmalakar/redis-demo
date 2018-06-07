'use strict';

class Helper {
    constructor() { }

    filterByName(name) {
        regex = new RegExp(name, 'i');
        let data = fakeJsonData.filter(d => d.first_name.match(regex));
        return data;
    }
}

module.exports = new Helper();