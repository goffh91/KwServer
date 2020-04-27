const BaseService = require('./BaseService');
const { bbs_m, board_m, bbs_file_m } = require('../model');
const { nowDate } = require('../utils/dateUtils');

class BbsService extends BaseService {
    constructor() {
        super();
    }

    static async checkAuth(method, bo_table, user) {
        // method: enum('list', 'read', 'write', 'reply', 'comment', 'upload', 'download')
        const [board] = await board_m.getBoard(bo_table);
        if (board[`bo_${method}_level`] === 1) return { result: true };
        if (user === undefined || !user.level) return { result: false, status: 401 };
        if (user.level >= board[`bo_${method}_level`]) {
            return { result: true };
        } else {
            return { result: false, status: 403 };
        }
    }

    static async getBbsList(bo_table, page, where = {}) {
        const boardResult = await board_m.getBoard(bo_table);
        const listSize = boardResult[0].bo_page_rows;
        const first = (page - 1) * listSize + 1;
        const last = first + listSize - 1;

        return await bbs_m.getBbsList(bo_table, {
            first,
            last,
            where,
        });
    }

    static async getBbs(bo_table, wr_id) {
        wr_id = parseInt(wr_id);
        const bbs = await bbs_m.getBbs(bo_table, wr_id);
        const files = await bbs_file_m.getBbsFiles(bo_table, wr_id);
        return { bbs, files };
    }

    static async createBbs(bo_table, params) {
        const [{ wr_num }] = await bbs_m.getNextNumber(bo_table);
        params = Object.assign(params, {
            wr_num: wr_num - 1,
            wr_datetime: nowDate()
        });

        const [{ wr_id }] = await bbs_m.createBbs(bo_table, params);
        await bbs_m.updateBbs(bo_table, wr_id, { wr_parent: wr_id });
        await board_m.addBbsCnt(bo_table);
        return { wr_id };
    }

    static async checkUDAuth(bo_table, wr_id, user, password = '') {
        wr_id = parseInt(wr_id);
        const [board] = await board_m.getBoard(bo_table);
        const bbs = await bbs_m.getBbs(bo_table, wr_id);

        if (user === undefined || !user.level) {
            return { result: false, status: 401 };
        } else if (user.level == 10 || [board['bo_admin'], bbs['mb_id']].includes(user.mb_id)) {
            return { result: true };
        } else {
            return { result: false, status: 403 };
        }
    }

    static async editBbs(bo_table, wr_id, params) {
        return await bbs_m.updateBbs(bo_table, wr_id, params);
    }

    static async deleteBbs(bo_table, wr_id) {
        wr_id = parseInt(wr_id);
        return await bbs_m.deleteBbs(bo_table, wr_id);
    }
}

module.exports = BbsService;
