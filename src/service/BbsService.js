const BaseService = require('./BaseService');
const { bbs_m, board_m, bbs_file_m } = require('../model');

class BbsService extends BaseService {

    constructor() {
        super();
    }

    static async getBbsList(bo_table, page, where = {}) {
        const boardResult = await board_m.getBoard(bo_table);
        const listSize = boardResult[0].bo_page_rows;
        const first = ((page - 1) * listSize) + 1;
        const last = first + listSize - 1;

        return await bbs_m.getBbsList({
            bo_table, first, last, where
        });
    }

    static async getBbs(bo_table, wr_id) {
        wr_id = parseInt(wr_id);
        const bbs = await bbs_m.getBbs({
            bo_table, wr_id
        });
        const files = await bbs_file_m.getBbsFiles({
            bo_table, wr_id
        });
        return { bbs, files };
    }

}

module.exports = BbsService;
