const BaseModel = require('./BaseModel');
const { G5_PREFIX } = require('../config/constant');

class BoardModel extends BaseModel {

    constructor() {
        super();
        this.boardTable = G5_PREFIX + 'board';
    }

    async getBoard(bo_table) {
        return this.db.raw(`SELECT * FROM ${this.boardTable} WHERE bo_table = '${bo_table}'`);
    }

    async getBoardList(params) {
        const { first, last, where } = params;
        return await this.db.raw(`SELECT * FROM ${this.boardTable} WHERE 1 LIMIT ${first}, ${last}`);
    }

}

module.exports = BoardModel;
