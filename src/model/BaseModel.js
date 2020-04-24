const db = require('../utils/prismaClient');

class BaseModel {

    constructor() {
        this.db = db;
    }

}

module.exports = BaseModel;