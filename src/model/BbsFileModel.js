const BaseModel = require('./BaseModel');

class BbsFileModel extends BaseModel {

    constructor() {
        super();
    }

    async getBbsFiles(bo_table, wr_id) {
        return this.db.g5_board_file.findMany({
            where: { bo_table, wr_id }
        });
    }

}

module.exports = BbsFileModel;