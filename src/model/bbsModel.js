const BaseModel = require('./BaseModel');
const { BBS_PREFIX } = require('../config/constant');

class BbsModel extends BaseModel {

    constructor() {
        super();
    }

    async getBbsList(params) {
        const { bo_table, first, last, where } = params;
        return await this.db[BBS_PREFIX + bo_table].findMany({
            first, last, where
        });
    }

    async getBbs(params) {
        const { bo_table, wr_id } = params;
        return await this.db[BBS_PREFIX + bo_table].findMany({
            where: { wr_id }
        });
    }

}

module.exports = BbsModel;