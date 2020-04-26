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

    async addBbsCnt(bo_table, count = 1) {
        return await this.db.raw(`UPDATE ${this.boardTable} SET bo_count_write = bo_count_write + ${count} WHERE bo_table = '${bo_table}'`);
    }

}

module.exports = BoardModel;
