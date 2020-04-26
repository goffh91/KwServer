const BaseModel = require('./BaseModel');
const { BBS_PREFIX } = require('../config/constant');

class BbsModel extends BaseModel {

    constructor() {
        super();
    }

    async getBbsList(bo_table, params) {
        const { first, last, where } = params;
        return await this.db[BBS_PREFIX + bo_table].findMany({
            first, last, where
        });
    }

    async getBbs(bo_table, wr_id) {
        return await this.db[BBS_PREFIX + bo_table].findMany({
            where: { wr_id }
        });
    }

    async getNextNumber(bo_table) {
        return await this.db.raw(`SELET MIN(wr_num) AS wr_num FROM ${BBS_PREFIX}${bo_table}`);
    }

    async createBbs(bo_table, params) {
        let setOption = [];
        for (let [key, value] of Object.entries(params)) {
            setOption.push(`${key} = '${value}'`);
        }
        let setString = setOption.join(',');
        await this.db.raw(`INSERT INTO ${BBS_PREFIX}${bo_table} SET ${setString}`);
        return this.db.raw(`SELECT LAST_INSERT_ID()`);
    }

    async updateBbs(bo_table, wr_id, params) {
        let setOption = [];
        for (let [key, value] of Object.entries(params)) {
            setOption.push(`${key} = '${value}'`);
        }
        let setString = setOption.join(',');
        return await this.db.raw(`UPDATE ${BBS_PREFIX}${bo_table} SET ${setString} WHERE wr_id = '${wr_id}'`);
    }

    async deleteBbs(bo_table, wr_id) {
        return await this.db.raw(`DELETE FROM ${BBS_PREFIX}${bo_table} WHERE wr_id = '${wr_id}'`);
    }

}

module.exports = BbsModel;