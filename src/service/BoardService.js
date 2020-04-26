const BaseService = require('./BaseService');
const { board_m } = require('../model');

class BoardService extends BaseService {

    constructor() {
        super();
    }

    static async getBoardList(page = 1, where = {}) {
        const listSize = 12;
        const first = ((page - 1) * listSize) + 1;
        const last = first + listSize - 1;
        return await board_m.getBoardList({
            first, last, where
        });
    }

    static async getBoard(bo_table) {
        return await board_m.getBoard(bo_table);
    }

}

module.exports = BoardService;